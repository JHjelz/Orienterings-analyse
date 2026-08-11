from django.urls import path

from .views import callback, connect, status

urlpatterns = [path("connect/", connect), path("callback/", callback),
               path("status/", status)]
