# ORIENTERINGS-ANALYSE/python/winsplit/

# Libraries
import matplotlib.pyplot as plt
import re
import requests

from bs4 import BeautifulSoup
from urllib.parse import parse_qs, urlparse


############################
# Functions
############################


def winsplits_table_url(url: str) -> str:
    parsed = urlparse(url)
    params = parse_qs(parsed.query)

    database_id = params["databaseId"][0]
    category_id = params["categoryId"][0]

    table_url = f"https://obasen.orientering.se/winsplits/online/no/table.asp?databaseId={database_id}&categoryId={category_id}"

    return table_url


def get_winsplits(url: str) -> dict:
    table_url = winsplits_table_url(url)
    
    headers = {"User-Agent": "Mozilla/5.0"}
    r = requests.get(table_url, headers)
    r.raise_for_status()

    soup = BeautifulSoup(r.text, "html.parser")

    tables = soup.find_all("table")

    rows = soup.find_all("tr")

    results = {}

    for i in range(2, len(rows), 2):
        row_leg = rows[i]
        row_total = rows[i+1]
        
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
        splits = [
            int(m) * 60 + int(s)
            for m, s in (
                t.split(".") for t in splits
            )
        ]
        
        results[name] = {
            "club": club,
            "splits": splits
        }
    
    return results


def get_total_times(data: dict) -> dict:
    for runner in data.keys():
        splits = data[runner]["splits"]

        total = []
        
        for i in range(len(splits)):
            total_time = (
                splits[i] + total[i-1]
                if i != 0
                else splits[i]
            )

            total.append(total_time)
        
        data[runner]["total"] = total

    return data


def create_plot(data: dict) -> None:
    first_runner = next(iter(data.values()))
    x_axis = list(range(len(first_runner["splits"]) + 1))

    plt.figure(figsize=(12, 6))

    count = 0
    for runner, info in data.items():
        y_axis = [0] + info["total"]
        
        plt.plot(
            x_axis,
            y_axis,
            marker="o",
            linewidth=2,
            label=runner
        )

        count += 1
        if count == 6:
            break
    
    plt.xlabel("Post")
    plt.ylabel("Tid (sek)")
    plt.title("Akkumulert tid gjennom løypa")

    plt.grid(True, linestyle="--", alpha=0.6)
    plt.legend()

    plt.tight_layout()
    plt.show()


############################
# Program
############################


url = "https://obasen.orientering.se/winsplits/online/no/default.asp?page=table&databaseId=110908&categoryId=1&ct=true"

data = get_winsplits(url=url)

data = get_total_times(data=data)

create_plot(data)
