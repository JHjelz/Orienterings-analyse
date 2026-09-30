import { useState } from "react";

import "./SplitAnalysis.css";

import { getNumSplits } from "./GeneralFunctions";

function SplitAnalysis({ data }) {
    const runners = Object.entries(data);
    const maxSplits = getNumSplits(runners);

    const [selectedType, setSelectedType] = useState("split");
    const [selectedSplit, setSelectedSplit] = useState(0);

    const splitButtons = Array.from(
        { length: maxSplits },
        (_, index) => index
    );

    return (
        <section className="split-stats">
            <header className="split-stats-header">
                <h2>Strekkanalyse</h2>

                <p>
                    Velg post du vil se stillingen ved, enten for enkeltstrekk eller totalt fra start til posten.
                </p>
            </header>

            <div className="split-stats-controls">
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

            <div className="split-stats-result">
                <p>
                    Valgt:{" "}
                    {selectedType === "split"
                        ? selectedSplit + 1 === maxSplits
                            ? "Oppløp"
                            : `Strekk ${selectedSplit + 1}`
                        : selectedSplit + 1 === maxSplits
                            ? "Mål"
                            : `Totalt etter post ${selectedSplit + 1}`}
                </p>
            </div>
        </section>
    )
}

export default SplitAnalysis;