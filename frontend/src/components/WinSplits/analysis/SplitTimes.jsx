import { useEffect, useState } from "react";

import "./SplitTimes.css"

import formatTime from "./GeneralFunctions";

function SplitTimes({ data }) {
    const [isOpen, setIsOpen] = useState(false);

    const runners = Object.entries(data);
    const maxSplits = Math.max(
        ...runners.map(([, runner]) => runner.splits.length),
        0
    );

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
        <div
            className={
                `split-times-table-wrapper ${isOpen  ? "split-times-table-wrapper-modal" : ""}`
            }
        >
            <div className="split-times-table">
                {/* HEADER */}
                <div
                    className="split-times-row split-times-header-row"
                    style={{
                        "--split-count": maxSplits,
                    }}
                >
                    <div className="split-times-cell split-times-name">
                        Navn
                    </div>

                    {Array.from(
                        { length: maxSplits },
                        (_, index) => (
                            <div
                                key={index}
                                className="split-times-cell split-times-split-header"
                            >
                                {index + 1 === maxSplits ? "Oppløp" : `Post ${index + 1}`}
                            </div>
                        )
                    )}

                    <div className="split-times-cell split-times-total">
                        Totaltid
                    </div>
                </div>

                {/* RUNNERS */}
                {runners.map(([name, runner], runnerIndex) => {
                    let cumulative = 0;

                    const splitTimes = runner.splits.map((split) => {
                        cumulative += split;

                        return { split, cumulative };
                    });

                    return (
                        <div
                            className="split-times-row split-times-runner"
                            key={name}
                            style={{
                                "--split-count": maxSplits
                            }}
                        >
                            {/* NAME */}
                            <div className="split-times-cell split-times-name split-times-runner-name">
                                <span className="split-times-position">
                                    {runnerIndex + 1}
                                </span>

                                <span>{name}</span>
                            </div>

                            {/* SPLITS */}
                            {Array.from(
                                { length: maxSplits },
                                (_, index) => {
                                    const split = splitTimes[index];

                                    return (
                                        <div
                                            key={index}
                                            className="split-times-split"
                                        >
                                            {split ? (
                                                <>
                                                    <div className="split-times-split-time">
                                                        {formatTime(
                                                            split.split
                                                        )}
                                                    </div>

                                                    <div className="split-times-cumulative">
                                                        {formatTime(
                                                            split.cumulative
                                                        )}
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div>-</div>
                                                    <div>-</div>
                                                </>
                                            )}
                                        </div>
                                    );
                                }
                            )}

                            {/* TOTAL */}
                            <div className="split-times-cell split-times-total split-times-runner-total">
                                {formatTime(cumulative)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

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