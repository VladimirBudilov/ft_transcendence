"""
ASGI config for settings project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

import os
import django

from django.core.asgi import get_asgi_application

from channels.sessions import SessionMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from channels.auth import AuthMiddlewareStack
from dotenv import load_dotenv

from chat.urls import websocket_urlpatterns

load_dotenv()

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.settings')

django.setup()

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "https": get_asgi_application(),
    "websocket": AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            SessionMiddlewareStack(
                URLRouter(
                    websocket_urlpatterns
                    )
                )
            )
        )
})
