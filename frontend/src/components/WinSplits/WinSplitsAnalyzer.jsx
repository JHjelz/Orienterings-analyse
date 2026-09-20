import { useState } from "react";

import WinSplitsSidebar from "./WinSplitsSidebar";

import SplitTimes from "./analysis/SplitTimes";

function WinSplitsAnalyzer({ data, status }) {
    const [activeAnalysis, setActiveAnalysis] = useState(null);

    const analyses = [
        { name: "Strekktider", func: SplitTimes }
    ];

    const ActiveAnalysis = activeAnalysis;

    return (
        <div className="winsplits-analyzer">
            <WinSplitsSidebar
                analyses={analyses}
                activeAnalysis={activeAnalysis}
                onAnalysisSelect={setActiveAnalysis}
            />

            <div className="winsplits-container">
                {!data && status.type == "idle" && (
                    <p>
                        Lim inn en WinSplits-lenke og trykk "Hent data".
                    </p>
                )}

                {status.type == "loading" && (
                    <p>
                        {status.message}
                    </p>
                )}

                {status.type == "error" && (
                    <p className="winsplits-error">
                        {status.message}
                    </p>
                )}

                {data && status.type !== "loading" && !ActiveAnalysis && (
                    <p>
                        Data er hentet - velg en analyse fra menyen til venstre og kom i gang!
                    </p>
                )}

                {data && status.type !== "loading" && ActiveAnalysis && (
                    <ActiveAnalysis data={data} />
                )}
            </div>
        </div>
    );
}

export default WinSplitsAnalyzer;