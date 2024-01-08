from django.urls import path, re_path

from chat import consumers
from chat import views

urlpatterns = [
]

websocket_urlpatterns = [
    # path that handles websocket connections with a global chat
    path('ws/chat/global/', consumers.GlobalChatConsumer.as_asgi()),
]
