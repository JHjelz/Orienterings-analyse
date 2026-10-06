import { useState } from "react";

import WinSplitsSidebar from "./WinSplitsSidebar";

import SplitTimes from "./analysis/SplitTimes";
import SplitAnalysis from "./analysis/SplitAnalysis";

function WinSplitsAnalyzer({ data, status }) {
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  const analyses = [
    {
      id: "split-times",
      name: "Strekktider",
      component: SplitTimes,
    },
    {
      id: "split-stats",
      name: "Strekkanalyse",
      component: SplitAnalysis,
    },
  ];

  const activeAnalysis = selectedAnalysis ?? (data ? "split-times" : null);

  const activeAnalysisConfig = analyses.find(
    (analysis) => analysis.id === activeAnalysis,
  );

  const ActiveAnalysis = activeAnalysisConfig?.component;

  return (
    <div className="winsplits-analyzer">
      <WinSplitsSidebar
        analyses={analyses}
        activeAnalysis={activeAnalysis}
        onAnalysisSelect={setSelectedAnalysis}
      />

      <div className="winsplits-container">
        {!data && status.type === "idle" && (
          <p>Lim inn en WinSplits-lenke og trykk "Hent data".</p>
        )}

        {status.type === "loading" && <p>{status.message}</p>}

        {status.type === "error" && (
          <p className="winsplits-error">{status.message}</p>
        )}

        {data && status.type !== "loading" && ActiveAnalysis && (
          <ActiveAnalysis data={data} />
        )}
      </div>
    </div>
  );
}

export default WinSplitsAnalyzer;
