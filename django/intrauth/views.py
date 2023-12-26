import os
import json
import requests
from django.views.generic import TemplateView
from django.shortcuts import redirect
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from rest_framework.views import APIView
from rest_framework.response import Response

INTRA_LOGIN_URL = os.environ.get('INTRA_API_URL') + \
        '/oauth/authorize?client_id=' + os.environ.get('INTRA_API_UID') + \
        '&redirect_uri=' + os.environ.get('INTRA_REDIRECT_URI') + \
        '&response_type=code' 


class IntraLogin(APIView):
    """
    If code is not provided, redirect to intra login page
    else get access token from intra api
    url: /intra/login
    """

    def get(self, request):
        code = request.headers.get('code')
        if (code == None):
            return redirect(INTRA_LOGIN_URL)
        
        if request.user:
            return Response({'error': 'already logged in'}, status=401)

        intra_login = request.headers.get('login')
        if (intra_login == None or intra_login == ""):
            return Response({'error': 'intra_login not provided'}, status=400)

        access_token = self.get_access_token(code)
        if (access_token == None):
            return Response({'error': 'invalid code'}, status=401)

        user_info = self.get_user_info(intra_login, access_token['access_token'])
        if (user_info == None or user_info == {}):
            return Response({'error': 'invalid login'}, status=401)

        user = User.objects.filter(username=user_info['login']).first()
        if (user == None):
            user = User.objects.create(username=user_info['login'])
            user.first_name = user_info['first_name']
            user.last_name = user_info['last_name']
            user.email = user_info['email']
        user.set_password(access_token['access_token'])
        user.save()
        user = authenticate(username=user.username, password=access_token['access_token'])
        if user is None:
            return Response({'error': 'invalid login'}, status=401)
        login(request, user)
        return Response(user_info, status=200)

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
        return response.json()



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



class IntraLogout(APIView):
    """
    Logout user
    url: /intra/logout
    """
    def get(self, request):
        user = request.user
        if (user == None):
            return Response({'error': 'not logged in'}, status=401)
        user.auth_token.delete()
        return Response({'success': 'logged out'}, status=200)



class IntraCallback(APIView):
    """
    Redirect to frontend with code
    url: /intra/callback
    """
    def get(self, request):
        code = request.GET.get('code')
        if (code == None):
            return redirect(os.environ.get('FRONTEND_URL') \
                    + '?error=invalid_code',
                    status=401)
        return redirect(os.environ.get('FRONTEND_URL') + '?code=' + code)


class IntraLoginPage(TemplateView):
    template_name = 'login.html'


class TestPage(TemplateView):
    template_name = 'test.html'
