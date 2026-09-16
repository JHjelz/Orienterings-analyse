# Bibliotek

import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from .functionality.winsplit_urls import get_winsplit_results


@csrf_exempt
@require_POST
def winsplit_results(request):
    try:
        data = json.loads(request.body)

        url = data.get("url")

        if not url:
            return JsonResponse(
                {"error": "URL mangler."},
                status=400,
            )

        results = get_winsplit_results(url=url)

        return JsonResponse({"results": results})
    except ValueError as error:
        return JsonResponse({"error": str(error)})
    except Exception as error:
        return JsonResponse(
            {"error": "Kunne ikke hente WinSplit-data."},
            status=500,
        )
