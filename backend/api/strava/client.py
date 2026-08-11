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
