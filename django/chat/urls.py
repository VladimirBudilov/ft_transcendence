from django.urls import path, re_path

from chat import consumers
from chat import views

urlpatterns = [
    path("", views.index, name="index"),
    path("room/<str:room_name>/", views.room, name="room"),
]

websocket_urlpatterns = [
    # path that handles websocket connections with a global chat
    path('ws/chat/global/', consumers.GlobalChatConsumer.as_asgi()),

    # path that handles websocket connections with a room name
    path('ws/chat/<str:room_name>/', consumers.ChatConsumer.as_asgi()),
]
