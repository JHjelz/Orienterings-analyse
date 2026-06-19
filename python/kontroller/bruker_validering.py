# ORIENTERINGS-ANALYSE/python/kontroller/bruker_validering.py

# Bibliotek

from datetime import datetime

# Konstanter

nivaa_1 = set([
    "avslutt",
    "strava",
    "winsplit"
])

nivaa_2 = set([
    "avslutt",
    "tilbake"
])

nivaa_kontroll = [
    nivaa_1, nivaa_2
]

# Funksjoner

def valider_bruker_input(bruker: str, nivaa: int, forste: bool, valg: int=0) -> tuple:
    """
    Validerer bruker-input.

    Args:
        bruker (str): Input fra brukeren
        nivaa (int): Heltall som indikerer nivået i programmet kontrollen skal utføres på
        forste (bool): Bool som sier om det er første runde i spørringa eller ikke
        valg (int, optional): Antall valgmuligheter på spørringer, default 0
    
    Returns:
        tuple:
            - str: Brukers input med små bokstaver
            - bool: True hvis input er gyldig til å fortsette systemet, False hvis return
    """
    gyldig = nivaa_kontroll[nivaa - 1].copy()

    if valg != 0:
        for i in range(1, valg + 1):
            gyldig.add(str(i))

    gyldig_str = f"({', '.join(gyldig)})" if valg == 0 else f"(avslutt, tilbake, {1 if valg == 1 else f'1 - {valg}'})"

    while bruker not in gyldig:
        if forste:
            print(f"Ugyldig input!\nValgmuligheter: {gyldig_str}.\n")
        bruker = input().lower()
        forste = True
    
    return bruker, not (bruker == "avslutt" or bruker == "tilbake")

def ja_nei(sporsmal: str) -> str:
    """
    Ber om bruker-input som må være av typen ja-nei.

    Args:
        sporsmal (str): Spørsmål til brukeren som definerer input

    Returns:
        str: Brukers input
    """
    valg = ["j", "ja", "n", "nei"]
    while True:
        bruker = input(f"{sporsmal} (J/N): ").lower()
        if bruker in valg:
            return bruker
        elif er_stop_tilbake(bruker=bruker):
            return bruker
        else:
            print(f"Ugyldig input! må være en av ({', '.join(valg)}).")

def positivt_heltall() -> str:
    """
    Ber om bruker-input som må være et positivt heltall.

    Returns:
        str: Brukers input
    """
    while True:
        bruker = input("Hvor mange vil du ha (heltall): ")
        try:
            heltall = int(bruker)
            if heltall > 0:
                return bruker
        except:
            if er_stop_tilbake(bruker=bruker):
                return bruker
            else:
                print(f"'{bruker}' er ikke et heltall! Prøv igjen.")

def er_stop_tilbake(bruker: str) -> bool:
    """
    Sjekker om bruker vil tilbake eller stoppe programmet.

    Args:
        bruker (str): Bruker-input

    Returns:
        bool: True hvis bruker in ('avslutt', 'tilbake'), else False
    """
    return bruker.lower() in nivaa_2

def er_stop(bruker: str) -> bool:
    """
    Sjekker om bruker vil stoppe programmet.

    Args:
        bruker (str): Bruker-input

    Returns:
        bool: True if bruker=='avslutt', else False
    """
    return bruker.lower() == "avslutt"

def er_tilbake(bruker: str) -> bool:
    """
    Sjekker om bruker vil tilbake et hakk i programmet.

    Args:
        bruker (str): Bruker-input

    Returns:
        bool: True if bruker=='tilbake', else False
    """
    return bruker.lower() == "tilbake"

def gyldig_dato() -> str:
    """
    Ber om bruker-input som må være gyldig dato.

    Returns:
        str: Dato på format dd-mm-åååå som tekst
    """
    while True:
        dato_input = input("Skriv inn dato (dd-mm-åååå): ")
        if er_stop_tilbake(dato_input):
            return dato_input
        try:
            gyldig_dato = datetime.strptime(dato_input, "%d-%m-%Y")
            return gyldig_dato.strftime('%d-%m-%Y')
        except:
            print("Ugyldig format eller dato. Vennligst prøv igjen (DD-MM-YYYY).")
