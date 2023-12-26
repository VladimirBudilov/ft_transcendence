from django.urls import path, re_path

from chat import consumers
from chat import views

urlpatterns = [
    path("", views.index, name="index"),
    path("room/<str:room_name>/", views.room, name="room"),
]

websocket_urlpatterns = [
    path('ws/chat/', consumers.ChatConsumer.as_asgi()),
    path('ws/chat/<str:room_name>/', consumers.ChatConsumer.as_asgi()),
]
