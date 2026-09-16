from django.urls import path

from .views import winsplit_results

urlpatterns = [path("results/", winsplit_results)]
