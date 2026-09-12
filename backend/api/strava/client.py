# Libraries

import requests

##########################
# Class
##########################


class StravaClient:
    """
    Klient for kommunikasjon med Strava API.
    """

    TOKEN_URL = "https://www.strava.com/oauth/token"
    API_URL = "https://www.strava.com/api/v3"

    def __init__(self, client_id, client_secret):
        self.client_id = client_id
        self.client_secret = client_secret

    def hent_tokens(self, authorization_code):
        """
        Bytter authorization code mot Strava tokens.
        """
        response = requests.post(
            self.TOKEN_URL,
            data={
                "client_id": self.client_id,
                "client_secret": self.client_secret,
                "code": authorization_code,
                "grant_type": "authorization_code",
            },
        )

        response.raise_for_status()

        return response.json()

    def refresh_access_token(self, refresh_token):
        """
        Henter et nytt access token fra Strava.
        """
        response = requests.post(
            self.TOKEN_URL,
            data={
                "client_id": self.client_id,
                "client_secret": self.client_secret,
                "refresh_token": refresh_token,
                "grant_type": "refresh_token",
            },
        )

        response.raise_for_status()

        return response.json()

    def hent_utover(self, access_token):
        """
        Henter informasjon om den innloggede Strava-brukeren.

        TODO:
        Aktiver med Strava-API.
        """
        response = requests.get(
            f"{self.API_URL}/athlete",
            headers={"Authorization": f"Bearer {access_token}"},
        )

        response.raise_for_status()

        return response.json()
