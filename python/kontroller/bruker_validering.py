# ORIENTERINGS-ANALYSE/python/kontroller/bruker_validering.py

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
