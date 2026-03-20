# ORIENTERINGS-ANALYSE/main.py

# Bibliotek

from python.kontroller.bruker_validering import valider_bruker_input

# Program

if __name__ == "__main__":
    print("""\n====================
\nORIENTERINGS-ANALYSE\n
====================\n
Velkommen til Orienterings-analyse.
Her kan du koble deg til din Strava-konto via API eller gjøre analyser på resultater i WinSplit.\n
====================""")

    print("""
Du kan når som helst avslutte programmet ved å skrive 'avslutt', eller gå tilbake ved å skrive 'tilbake'.

Hva vil du? Velg 'Strava' eller 'WinSplit':
""")

    bruker = input().lower()
    forste = False

    while (validering := valider_bruker_input(bruker=bruker, nivaa=1, forste=forste)):
        bruker, gyldighet = validering

        if not gyldighet:
            break
        
        elif bruker == "strava":
            print("Strava")
        elif bruker == "winsplit":
            print("WinSplit")
        
        print("\nDu er nå tilbake i hovedmenyen.\n\nHva vil du? Velg 'Strava' eller 'WinSplit':")

        bruker = ""
        forste = True
