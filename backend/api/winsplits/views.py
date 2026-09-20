# Bibliotek

import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from .functionality.winsplits_urls import hent_winsplits_resultater

##########################
# Funksjonalitet
##########################


@csrf_exempt
@require_POST
def winsplits_resultater(request):
    try:
        data = json.loads(request.body)

        url = data.get("url")

        if not url:
            return JsonResponse(
                {"error": "URL mangler."},
                status=400,
            )

        resultater = hent_winsplits_resultater(url=url)

        return JsonResponse({"resultater": resultater})
    except ValueError as error:
        return JsonResponse({"error": str(error)})
    except Exception as error:
        return JsonResponse(
            {"error": "Kunne ikke hente WinSplit-data."},
            status=500,
        )
