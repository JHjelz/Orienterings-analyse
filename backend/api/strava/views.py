from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import redirect

from .client import StravaClient


def connect(request):
    print(
        "STRAVA CLIENT ID FINNES:",
        bool(settings.STRAVA_CLIENT_ID)
    )

    strava_url = (
        "https://www.strava.com/oauth/authorize"
        f"?client_id={settings.STRAVA_CLIENT_ID}"
        "&response_type=code"
        f"&redirect_uri={settings.BACKEND_URL}/api/strava/callback/"
        "&approval_prompt=auto"
        "&scope=read,activity:read_all"
    )

    return redirect(strava_url)


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

    return redirect(f"{settings.FRONTEND_URL}/Orienterings-analyse/strava/")


def status(request):
    connected = "strava_access_token" in request.session

    return JsonResponse(
        {
            "connected": connected,
        }
    )
