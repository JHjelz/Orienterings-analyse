import { useEffect, useState } from "react";

import "./SplitTimes.css"

import SplitTable from "./SplitTable";
import { getMaxSplits } from "./GeneralFunctions";

function PrepareSplitTimes(data) {
    const runners = Object.entries(data);
    const maxSplits = getMaxSplits(runners);

    const columns = [
        {key: "name", label: "Navn", type: "name"},
        {key: "club", label: "Klubb", type: "club"},
        ...Array.from({ length: maxSplits }, (_, index) => ({
            key: `split-${index}`,
            label: index + 1 === maxSplits
                ? "Oppløp"
                : `Post ${index + 1}`,
            type: "split",
        })),
        {key: "total", label: "Totaltid", type: "total"},
    ];

    const rows = runners.map(([name, runner], runnerIndex) => {
        let cumulative = 0;
        const splits = runner.splits.map((split) => {
            cumulative += split;
            return { split, cumulative };
        });

        const row = {
            position: runnerIndex + 1,
            name,
            club: runner.club,
            total: cumulative
        };

        splits.forEach((split, index) =>  {
            row[`split-${index}`] = split;
        });

        return row;
    });

    return { columns, rows };
}

function SplitTimes({ data }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [isOpen]);

    const buttonOpen = (
        <button
            className="split-times-expand-button"
            onClick={() => setIsOpen(true)}
            aria-label="Vis strekktider i fullskjerm"
            title="Vis i fullskjerm"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fullscreen" viewBox="0 0 16 16">
                <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5M.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5"/>
            </svg>
        </button>
    );

    const buttonClose = (
        <button
            className="split-times-modal-close-button"
            onClick={() => setIsOpen(false)}
            aria-label="Lukk strekktider"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-fullscreen-exit" viewBox="0 0 16 16">
                <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5m5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5M0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5m10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0z"/>
            </svg>
        </button>
    );

    const header = (
        <div className="split-times-header">
            <div className="split-times-title">
                <h2>Strekktider</h2>

                {isOpen ? buttonClose : buttonOpen}
            </div>
            <p>
                Strekktider øverst og akkumulert tid fra start under.
            </p>
        </div>
    );

    const table = (
        <SplitTable
            data={ PrepareSplitTimes(data) }
            isModal={isOpen}
        />
    )

    return (
        <>
            <section className="split-times">
                {header}

                {table}
            </section>

            {isOpen && (
                <div className="split-times-modal-backdrop" onClick={() => setIsOpen(false)}>
                    <section
                        className="split-times split-times-modal"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {header}

                        {table}
                    </section>
                </div>
            )}
        </>
    );
}

export default SplitTimes;