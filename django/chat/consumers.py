# chat/consumers.py
import json

from asgiref.sync import async_to_sync, sync_to_async

from channels.generic.websocket import AsyncWebsocketConsumer

from django.contrib.auth.models import User

from rest_framework_simplejwt.tokens import AccessToken

from .utils import get_user_by_jwt_token
from .models import Message, Chat


class GlobalChatConsumer(AsyncWebsocketConsumer):

    # This method is called when a new instance of the consumer is created.
    async def connect(self):
        self.room_group_name = "global"
        # Join room group
        # async_to_sync is a wrapper that allows you to use async code in a synchronous environment
        # self.channel_layer is a channel layer instance that we can use to communicate with our worker
        # group_add() method to add a channel to a group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

        messages = await Message.objects.async_all()

        messages = messages.order_by("-created_at")[:10:-1]
        for message in messages:
            user = message.user if message.user else "Anonymous"
            await self.send(text_data=json.dumps({"message": message.message, "author": user}))


    async def disconnect(self, close_code):
        # Leave room group
        # group_discard() method to remove a channel from a group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )


    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        # Get user
        user = await get_user_by_jwt_token(self.scope["cookies"].get("X-Access-Token"))

        # Change message format
        await Message.objects.async_create(
            user=user,
            message=message
        )
        user = user if user else "Anonymous"

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {"type": "chat_message", "author": user, "message": message}
        )


    # Receive message from room group
    async def chat_message(self, event):
        message = event["message"]

        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message}))
