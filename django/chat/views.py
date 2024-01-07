from django.shortcuts import render

def index(request):
    return render(request, "chat/index.html")# Create your views here.

def room(request):
    return render(request, "chat/room.html", {
        'room_name': "global",
    })
