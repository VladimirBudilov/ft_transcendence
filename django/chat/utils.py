from asgiref.sync import sync_to_async
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth.models import User


async def get_user_by_jwt_token(access_token):
    # get user by access token
    try:
        access_token = AccessToken(access_token)
        user = await sync_to_async(User.objects.get)(id=access_token["user_id"])
        return user
    except Exception as e:
        return None
