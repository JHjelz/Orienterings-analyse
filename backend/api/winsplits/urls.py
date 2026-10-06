from django.urls import path

from .views import winsplits_resultater

urlpatterns = [path("resultater/", winsplits_resultater)]
