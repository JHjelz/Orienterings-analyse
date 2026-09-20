# Bibliotek

import requests

from bs4 import BeautifulSoup
from urllib.parse import parse_qs, urlparse

##########################
# Funksjonalitet
##########################


def winsplits_tabell_url(url: str) -> str:
    """
    Henter en unik URL for bare tidtabellen.

    Args:
        url (str): URL-en til den originale WinSplit resultat-siden

    Returns:
        str: Den nye URL-en
    """
    parsed = urlparse(url)
    params = parse_qs(parsed.query)

    try:
        database_id = params["databaseId"][0]
    except KeyError:
        raise ValueError("URL-en mangler databaseId")

    try:
        category_id = params["categoryId"][0]
    except KeyError:
        raise ValueError("URL-en mangler categoryId")

    return f"https://obasen.orientering.se/winsplits/online/no/table.asp?databaseId={database_id}&categoryId={category_id}"


def hent_winsplits_resultater(url: str) -> dict:
    """
    Henter de faktiske resultatene pakket i en dict.

    Args:
        url (str): URL-en til den originale WinSplit resultat-siden

    Returns:
        dict: Resultatene pakket på formatet 'navn': {'club': str, 'splits': list}
    """
    table_url = winsplits_tabell_url(url)

    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(table_url, headers=headers, timeout=10)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")

    rader = soup.find_all("tr")

    resultater = {}

    for i in range(2, len(rader), 2):
        row_leg = rader[i]
        row_total = rader[i + 1]

        leg_cols = [c.get_text(strip=True) for c in row_leg.find_all("td")]
        total_cols = [c.get_text(strip=True) for c in row_total.find_all("td")]

        try:
            valid = int(leg_cols[0]) > 0
        except:
            valid = False

        if not valid:
            continue

        name = leg_cols[1]
        club = total_cols[0]

        splits = leg_cols[2:-1]
        splits = [int(m) * 60 + int(s) for m, s in (t.split(".") for t in splits)]

        resultater[name] = {"club": club, "splits": splits}

    return resultater
