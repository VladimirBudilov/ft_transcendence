import os
import json
import requests
from django.views.generic import TemplateView
from django.shortcuts import redirect
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication 
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken


INTRA_LOGIN_URL = os.environ.get('INTRA_API_URL') + \
        '/oauth/authorize?client_id=' + os.environ.get('INTRA_API_UID') + \
        '&redirect_uri=' + os.environ.get('INTRA_REDIRECT_URI') + \
        '&response_type=code' 


class IntraLogin(APIView):
    def get(self, request):
        """
            Redirect to intra login page
        """

        return redirect(INTRA_LOGIN_URL)


    def post(self, request):
        """
            Get user info from intra and login
            Create user if not exists
        """

        # Check if user is already logged in
        if (request.user.is_authenticated):
            return Response({'error': 'already logged in'}, status=200)
        code = request.data.get('code')

        # Check if code is provided
        if (code == None):
            return Response({'error': 'code not provided'}, status=400)
        intra_login = request.data.get('login')

        # Check if intra_login is provided
        if (intra_login == None or intra_login == ""):
            return Response({'error': 'intra_login not provided'}, status=400)
        access_token = self.get_access_token(code)

        # Check if access_token is valid
        if (access_token == None):
            return Response({'error': 'invalid code or secret key was updated'}, status=401)

        # Check if user exists
        user = User.objects.filter(username=intra_login).first()
        if (user == None):
            user_info = self.get_user_info(intra_login, access_token['access_token'])

            # Check if user_info is valid
            if (user_info == None or user_info == {}):
                return Response({'error': 'invalid login'}, status=401)

            user = User.objects.create(username=user_info['login'])
            user.first_name = user_info['first_name']
            user.last_name = user_info['last_name']
            user.email = user_info['email']

        # Login user
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'expires': str(refresh.access_token.lifetime)
            }, status=200)


    def get_user_info(self, login, access_token):
        headers = {
                'Authorization': 'Bearer ' + access_token
                }
        response = requests.get(
                os.environ.get('INTRA_API_URL') + '/v2/users/' + login,
                headers=headers)
        return response.json()


    def get_access_token(self, code):
        data = {
            'grant_type': 'client_credentials',
            'client_id': os.environ.get('INTRA_API_UID'),
            'client_secret': os.environ.get('INTRA_API_SECRET'),
            'code': code
        }
        response = requests.post('https://api.intra.42.fr/oauth/token', data=data)
        if response.status_code != 200:
            return None
        return response.json()



class RefreshTokenView(APIView):
    """
        Refresh token
        url: /intra/jwt/refresh
    """

    def get(self, request):
        refresh_token = request.GET.get('refresh')
        if (refresh_token == None):
            return Response({'error': 'refresh token not provided'}, status=400)
        try:
            refresh = RefreshToken(refresh_token)
        except:
            return Response({'error': 'invalid refresh token'}, status=401)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh)
            }, status=200)



class IntraMe(APIView):
    """
    Get user info
    url: /intra/me
    """
    def get(self, request):
        user = request.user
        if (user == None):
            return Response({'error': 'not logged in'}, status=401)
        return Response({
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email
            }, status=200)



class IntraCallback(APIView):
    """
    Redirect to frontend with code
    url: /intra/callback
    """
    def get(self, request):
        code = request.GET.get('code')
        if (code == None):
            return redirect(os.environ.get('FRONTEND_URL') \
                    + '/login?error=invalid_code',
                    status=401)
        return redirect(os.environ.get('FRONTEND_URL') + '/login?code=' + code)
