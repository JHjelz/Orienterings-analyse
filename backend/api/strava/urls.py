from django.urls import path

from .views import callback, connect

urlpatterns = [
    path("connect/", connect),
    path("callback/", callback)
]