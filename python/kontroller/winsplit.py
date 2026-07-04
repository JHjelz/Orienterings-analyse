# ORIENTERINGS-ANALYSE/python/kontroller/winsplit.py

# Bibliotek

from .bruker_validering import valider_bruker_input

# Konstanter

valgmuligheter = ""

valg = len([linje for linje in valgmuligheter.splitlines() if linje.strip() != ""])

# Program


def WinSplitProgram() -> str:
    """
    Funksjonalitet for å kjøre hovedprogrammet med WinSplit-analyser.
    """
    print(f"""
====================
WinSplit-analyse
====================

Her kan du analysere WinSplit-resultater.

Her kan du:
{valgmuligheter}

Hva vil du? Velg {1 if valg == 1 else f'1 - {valg}'}.
""")
    bruker = input().lower()
    forste = True

    while validering := valider_bruker_input(
        bruker=bruker, nivaa=2, forste=forste, valg=valg
    ):
        bruker, gyldig = validering

        if not gyldig:
            break

        print(bruker)
        bruker = ""
        forste = False

    return bruker
