import "./SplitTimes.css"

import formatTime from "./GeneralFunctions";

function SplitTimes({ data }) {
    const runners = Object.entries(data);
    const maxSplits = Math.max(
        ...runners.map(([, runner]) => runner.splits.length),
        0
    );

    return (
        <section className="split-times">
            <div className="split-times-header">
                <h2>Strekktider</h2>
                <p>
                    Strekktider øverst og akkumulert tid fra start under.
                </p>
            </div>

            <div className="split-times-table-wrapper">
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
                                Strekk {index + 1}
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
        </section>
    );
}

export default SplitTimes;