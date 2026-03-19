# ORIENTERINGS-ANALYSE/python/kontroller/bruker_validering.py

# Konstanter

nivaa_1 = set([
    "avslutt",
    "strava",
    "winsplit"
])

nivaa_kontroll = [
    nivaa_1
]

# Funksjoner

def valider_bruker_input(bruker: str, nivaa: int) -> tuple:
    """
    Validerer bruker-input.

    Args:
        bruker (str): Input fra brukeren
        nivaa (int): Heltall som indikerer nivået i programmet kontrollen skal utføres på
    
    Returns:
        tuple:
            - str: Brukers input med små bokstaver
            - bool: True hvis input er gyldig til å fortsette systemet, False hvis return
    """
    gyldig = nivaa_kontroll[nivaa - 1]
    gyldig_str = f"({' ,'.join(gyldig)})"

    while bruker not in gyldig:
        print(f"Ugyldig input!\nValgmuligheter: {gyldig_str}.\n")
        bruker = input().lower()
    
    return bruker, not (bruker == "avslutt" or bruker == "tilbake")
