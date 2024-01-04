# chat/consumers.py
import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer


class GlobalChatConsumer(AsyncWebsocketConsumer):
    """
    This consumer handles global chat messages.
    """
    async def connect(self):
        # Join room group
        await self.channel_layer.group_add("global_chat", self.channel_name)
        await self.accept()
        if self.scope["session"]:
            print(self.scope["session"].session_key)
        else:
            self.scope["session"]
            self.scope["session"].save()

    
    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard("global_chat", self.channel_name)


    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        # Send message to room group
        await self.channel_layer.group_send(
            "global_chat", {"type": "chat_message", "message": message}
        )
    

    async def chat_message(self, event):
        message = event["message"]

        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message}))



class ChatConsumer(AsyncWebsocketConsumer):

    # This method is called when a new instance of the consumer is created.
    async def connect(self):
        # self.scope is a dictionary that contains information about the connection
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        # self.room_name is the name of the chat room that the user wants to join
        self.room_group_name = f"chat_{self.room_name}"

        # Join room group
        # async_to_sync is a wrapper that allows you to use async code in a synchronous environment
        # self.channel_layer is a channel layer instance that we can use to communicate with our worker
        # group_add() method to add a channel to a group
        await self.channel_layer.group_add(
            self.room_group_name, self.channel_name
        )
        await self.accept()


    async def disconnect(self, close_code):
        # Leave room group
        # group_discard() method to remove a channel from a group
        await self.channel_layer.group_discard(
            self.room_group_name, self.channel_name
        )


    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        # Send message to room group
        # group_send() method to send a message to a group
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat_message", "message": message}
        )


    # Receive message from room group
    async def chat_message(self, event):
        message = event["message"]

        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message}))
