# ORIENTERINGS-ANALYSE/python/kontroller/strava.py

# Bibliotek

from .bruker_validering import valider_bruker_input
from ..strava.aktiviteter import hent_aktiviteter
from ..strava.strava import StravaKlient
from ..ui.visning import fin_print

# Konstanter

valgmuligheter = """
1) Hente de siste 20 (x) aktivitetene dine
2) Hente aktivitet(er) på navn
3) Hente aktivitet(er) på dato
4) Hente kudos-giver(e) for aktivitet på navn
5) Hente aktivitet(er) på aktivitetstype
6) Hente diverse rekorder
7) Generere PDF av enkeltaktivitet
8) Printe aktivitetene fint
9) Printe rekorder pent og ryddig
"""

valg = len([linje for linje in valgmuligheter.splitlines() if linje.strip() != ""])

# Program

def StravaProgram() -> str:
    """
    Funksjonalitet for å kjøre hovedprogrammet med WinSplit-analyser.
    """
    print(f"""
====================
Strava-analyse
====================

Her kan du analysere dine Strava-aktiviteter.

Her kan du:
{valgmuligheter}
""")
    
    print("Initialiserer Strava API:")
    klient = StravaKlient()
    
    print(f"\nHva vil du? Velg {1 if valg == 1 else f'1 - {valg}'}.")

    bruker = input().lower()
    forste = True

    while (validering := valider_bruker_input(bruker=bruker, nivaa=2, forste=forste, valg=valg)):
        bruker, gyldig = validering

        if not gyldig:
            break

        if bruker == "1":
            s = input("Vil du ha fler enn 20 (J/N): ").lower()
            if s == "j":
                a = int(input("Hvor mange vil du ha: "))
                aktiviteter = hent_aktiviteter(access_token=klient.access_token, per_page=a)
            else:
                aktiviteter = hent_aktiviteter(access_token=klient.access_token)
            fin_print(aktiviteter=aktiviteter)


        print(f"Vil du analysere noe mer fra Strava?\nVelg {1 if valg == 1 else f'1 - {valg}'}.")
        bruker = ""
        forste = False

    return bruker
