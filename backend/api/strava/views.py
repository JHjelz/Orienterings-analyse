from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import redirect

from .client import StravaClient


def callback(request):
    code = request.GET.get("code")

    client = StravaClient(
        settings.STRAVA_CLIENT_ID,
        settings.STRAVA_CLIENT_SECRET,
    )

    tokens = client.hent_tokens(code)

    request.session["strava_access_token"] = tokens["access_token"]
    request.session["strava_refresh_token"] = tokens["refresh_token"]
    request.session["strava_expires_at"] = tokens["expires_at"]

    return redirect("http://127.0.0.1:5173/Orienterings-analyse/strava/")


def connect(request):
    strava_url = (
        "https://www.strava.com/oauth/authorize"
        f"?client_id={settings.STRAVA_CLIENT_ID}"
        "&response_type=code"
        "&redirect_uri=http://127.0.0.1:8000/api/strava/callback/"
        "&approval_prompt=auto"
        "&scope=read,activity:read_all"
    )

    return redirect(strava_url)


def status(request):
    connected = "strava_access_token" in request.session

    return JsonResponse(
        {
            "connected": connected,
        }
    )
