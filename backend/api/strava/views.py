from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import redirect

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

def callback(request):
    code = request.GET.get("code")

    return JsonResponse({
        "message": "Strava callback works!",
        "code_received": code is not None,
    })