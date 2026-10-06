import { useState } from "react";

import "./SplitAnalysis.css";
import "./SplitTimes.css";

import { getMaxSplits } from "./GeneralFunctions";
import SplitTable from "./SplitTable";

function PrepareSplitAnalysis(data, selectedType, selectedSplit, maxSplits) {
    const runners = Object.entries(data);

    const rows = runners.map(([name, runner]) => {
        const split = runner.splits[selectedSplit];
        const total = runner.splits
            .slice(0, selectedSplit + 1)
            .reduce((sum, time) => sum + time, 0);
        const time = selectedType === "split" ? split : total;

        return {
            name,
            club: runner.club,
            time,
        };
    })
    .filter((row) => row.time !== undefined && row.time > 0)
    .sort((a, b) => a.time - b.time);

    const bestTime = rows[0]?.time ?? 0;

    rows.forEach((row, index) => {
        row.time = { value: row.time, position: index + 1 }
        row.behind = row.time.value - bestTime;
    });

    const columns = [
        {key: "name", label: "Navn", type: "name"},
        {key: "club", label: "Klubb", type: "club"},
        {
            key: "time",
            label: selectedType === "split"
                ? selectedSplit + 1 === maxSplits
                    ? "Oppløp"
                    : `Strekk ${selectedSplit + 1}`
                : selectedSplit + 1 === maxSplits
                    ? "Mål"
                    : `Totalt etter post ${selectedSplit + 1}`,
            type: "time",
        },
        {key: "behind", label: "Bak", type: "behind"},
    ];

    return { columns, rows }
}

function SplitAnalysis({ data }) {
    const runners = Object.entries(data);
    const maxSplits = getMaxSplits(runners);

    const [selectedType, setSelectedType] = useState("split");
    const [selectedSplit, setSelectedSplit] = useState(0);

    const splitButtons = Array.from(
        { length: maxSplits },
        (_, index) => index
    );

    const table = (
        <SplitTable
            data={ PrepareSplitAnalysis(data, selectedType, selectedSplit, maxSplits) }
            equalColumns
        />
    )

    return (
        <section className="split-stats">
            <header className="split-times-header split-stats-header">
                <div className="split-stats-header-content">
                    <div className="split-times-title">
                        <div>
                            <h2>Strekkanalyse</h2>

                            <p>
                                Velg post du vil se stillingen ved, enten for enkeltstrekk eller totalt fra start til posten.
                            </p>
                        </div>
                    </div>

                    <div className="split-stats-control-groups">
                        <div className="split-stats-control-group">
                            <div className="split-stats-control-label">
                                Strekk
                            </div>

                            <div className="split-stats-buttons">
                                {splitButtons.map((split) => (
                                    <button
                                        key={split}
                                        className={
                                            `split-stats-button ${
                                                selectedType === "split" &&
                                                selectedSplit === split
                                                    ? "split-stats-button-active"
                                                    : ""
                                            }`
                                        }
                                        onClick={() => {
                                            setSelectedType("split");
                                            setSelectedSplit(split);
                                        }}
                                    >
                                        {split + 1 === maxSplits
                                            ? "Oppløp"
                                            : split + 1}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="split-stats-control-group">
                            <div className="split-stats-control-label">
                                Total
                            </div>

                            <div className="split-stats-buttons">
                                {splitButtons.map((split) => (
                                    <button
                                        key={split}
                                        className={
                                            `split-stats-button ${
                                                selectedType === "total" &&
                                                selectedSplit === split
                                                    ? "split-stats-button-active"
                                                    : ""
                                            }`
                                        }
                                        onClick={() => {
                                            setSelectedType("total");
                                            setSelectedSplit(split);
                                        }}
                                    >
                                        {split + 1 === maxSplits
                                            ? "Mål"
                                            : split + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="split-stats-result">
                {table}
            </div>
        </section>
    )
}

export default SplitAnalysis;