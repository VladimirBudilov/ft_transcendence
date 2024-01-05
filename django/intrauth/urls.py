from django.urls import path

from . import views

urlpatterns = [
        path('auth/intra/login/', views.IntraLogin.as_view()),
        path('auth/intra/me/', views.IntraMe.as_view()),
        path('auth/intra/callback/', views.IntraCallback.as_view()),
]
