from django.urls import include, path
from .views import hello

urlpatterns = [
    path("hello/", hello),
    path("strava/", include("api.strava.urls"))
]
