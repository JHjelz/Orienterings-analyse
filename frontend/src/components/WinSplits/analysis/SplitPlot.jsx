import { useMemo, useState } from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { formatTime, getMaxSplits } from "./GeneralFunctions";

function SplitPlot({ data }) {
    const runners = Object.entries(data);
    const [mode, setMode] = useState("accumulated");

    const [selectedRunners, setSelectedRunners] = useState(
        () => new Set(runners.map(([name]) => name)),
    );

    const [referenceRunner, setReferenceRunner] = useState(null);

    /*
    * Lag akkumulert tid per løper
    */
    const accumulatedTimes = useMemo(() => {
        const result = {};

        runners.forEach(([name, runner]) => {
            let accumulated = 0;

            result[name] = (runner.splits ?? []).map((split) => {
                accumulated += Number(split) || 0;
                return accumulated;
            });
        });

        return result;
    }, [data]);

    /*
    * Finn maksimalt antall poster.
    */
    const maxSplits = getMaxSplits(runners);

    /*
    * Bygg data til grafen.
    */
    const chartData = useMemo(() => {
        return Array.from({ length: maxSplits }, (_, splitIndex) => {
            const point = {
                split: splitIndex + 1,
            };

            let referenceTime = null;

            if (mode === "difference") {
                if (referenceRunner) {
                    /*
                    * Eksplisitt referanse:
                    * Bruk alltid denne løperen, selv om løperen
                    * ikke er valgt for visning i grafen.
                    */
                    referenceTime =
                    accumulatedTimes[referenceRunner]?.[splitIndex] ?? null;
                } else {
                    /*
                    * Ingen eksplisitt referanse:
                    * Finn beste akkumulert tid blant løperne
                    * som faktisk er valgt for visning.
                    */
                    const selectedTimes = (
                        runners
                        .filter(([name]) => selectedRunners.has(name))
                        .map(([name]) => accumulatedTimes[name]?.[splitIndex])
                        .filter((time) => time != null)
                    );

                    if (selectedTimes.length > 0) {
                        referenceTime = Math.min(...selectedTimes);
                    }
                }
            }

            runners.forEach(([name]) => {
                const runnerTime = accumulatedTimes[name]?.[splitIndex];

                if (runnerTime == null) {
                    point[name] = null;
                    return;
                }

                if (mode === "difference" && referenceTime != null) {
                    point[name] = runnerTime - referenceTime;
                } else {
                    point[name] = runnerTime;
                }
            });

            return point;
        });
    }, [
    accumulatedTimes,
    maxSplits,
    mode,
    referenceRunner,
    runners,
    selectedRunners,
    ]);


    /*
    * Slå en løper av/på i grafen.
    */
    const toggleRunner = (name) => {
    setSelectedRunners((current) => {
    const next = new Set(current);

    if (next.has(name)) {
    next.delete(name);
    } else {
    next.add(name);
    }

    return next;
    });
    };

    const selectAll = () => {
    setSelectedRunners(new Set(runners.map(([name]) => name)));
    };

    const selectNone = () => {
    setSelectedRunners(new Set());
    };

    /*
    * Velg/fjern referanseløper.
    */
    const setReference = (name) => {
    setReferenceRunner((current) =>
    current === name ? null : name,
    );
    };

    return (
    <div className="split-plot">
    <div className="split-plot-header">
    <h2>Grafvisning</h2>

    <p>
    Visualiser utviklingen til løperne gjennom løpet.
    </p>
    </div>

    {/* Modus */}
    <div className="split-plot-mode">
    <button
    type="button"
    onClick={() => setMode("accumulated")}
    aria-pressed={mode === "accumulated"}
    >
    Akkumulert tid
    </button>

    <button
    type="button"
    onClick={() => setMode("difference")}
    aria-pressed={mode === "difference"}
    >
    Tidsdifferanse
    </button>
    </div>

    {/* Løpervalg */}
    <div className="split-plot-controls">
    <div className="split-plot-actions">
    <button type="button" onClick={selectAll}>
    Alle
    </button>

    <button type="button" onClick={selectNone}>
    Ingen
    </button>
    </div>

    <div className="split-plot-runners">
    {runners.map(([name, runner]) => {
    const isSelected = selectedRunners.has(name);
    const isReference = referenceRunner === name;

    return (
    <div key={name} className="runner-control">
    <label>
    <input
    type="checkbox"
    checked={isSelected}
    onChange={() => toggleRunner(name)}
    />

    <span>
    {name}
    {runner.club ? ` (${runner.club})` : ""}
    </span>
    </label>

    {mode === "difference" && (
    <button
    type="button"
    onClick={() => setReference(name)}
    aria-pressed={isReference}
    >
    {isReference
    ? "Referanse ✓"
    : "Bruk som referanse"}
    </button>
    )}
    </div>
    );
    })}
    </div>
    </div>

    {/* Graf */}
    <div className="split-plot-chart">
    {selectedRunners.size === 0 ? (
    <div className="split-plot-empty">
    <p>Velg minst én løper for å vise grafen.</p>
    </div>
    ) : (
    <ResponsiveContainer width="100%" height={500}>
    <LineChart
    data={chartData}
    margin={{
    top: 20,
    right: 30,
    left: 20,
    bottom: 20,
    }}
    >
    <CartesianGrid strokeDasharray="3 3" />

    <XAxis
    dataKey="split"
    label={{
    value: "Strekke",
    position: "insideBottom",
    offset: -10,
    }}
    />

    <YAxis
    tickFormatter={formatTime}
    label={{
    value:
    mode === "accumulated"
    ? "Akkumulert tid"
    : "Tidsdifferanse",
    angle: -90,
    position: "insideLeft",
    }}
    />

    <Tooltip
    formatter={(value) => {
    if (value == null) {
    return "";
    }

    return formatTime(value);
    }}
    labelFormatter={(split) => `Strekke ${split}`}
    />

    <Legend />

    {runners
    .filter(([name]) =>
    selectedRunners.has(name),
    )
    .map(([name]) => (
    <Line
    key={name}
    type="monotone"
    dataKey={name}
    name={name}
    strokeWidth={
    name === referenceRunner ? 3 : 2
    }
    dot={false}
    activeDot={{ r: 6 }}
    />
    ))}
    </LineChart>
    </ResponsiveContainer>
    )}
    </div>
    </div>
    );
}

export default SplitPlot;
