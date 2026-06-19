# ORIENTERINGS-ANALYSE/python/kontroller/strava.py

# Bibliotek

from .bruker_validering import er_stop, er_tilbake, ja_nei, positivt_heltall, valider_bruker_input
from ..strava.aktiviteter import finn_aktiviteter_med_navn, finn_aktiviteter_paa_dato, hent_aktiviteter
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
            s = ja_nei(sporsmal="Vil du ha fler enn 20")
            if er_stop(s):
                return s
            elif er_tilbake(s):
                pass
            elif s in ["j", "ja"]:
                a = positivt_heltall()
                if er_stop(a):
                    return a
                elif er_tilbake(a):
                    pass
                else:
                    fin_print(aktiviteter=hent_aktiviteter(access_token=klient.access_token, per_page=int(a)))
            else:
                fin_print(aktiviteter=hent_aktiviteter(access_token=klient.access_token))
        elif bruker == "2":
            n = input("Hvilken aktivitet vil du søke etter: ")
            if er_stop(n):
                return n
            elif er_tilbake(n):
                pass
            else:
                a = positivt_heltall()
                if er_stop(a):
                    return a
                elif er_tilbake(a):
                    pass
                else:
                    fin_print(finn_aktiviteter_med_navn(klient.access_token, navn=n, maks_treff=int(a)))
        elif bruker == "3":
            finn_aktiviteter_paa_dato(access_token=klient.access_token, dato_str="")

        print(f"\nVil du analysere noe mer fra Strava?\nVelg {1 if valg == 1 else f'1 - {valg}'}.")
        bruker = ""
        forste = False

    return bruker
