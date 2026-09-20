import { useState } from "react";

import WinSplitsHeader from "../components/WinSplits/WinSplitsHeader";
import WinSplitsInput from "../components/WinSplits/WinSplitsInput";
import WinSplitsAnalyzer from "../components/WinSplits/WinSplitsAnalyzer";

import "../components/WinSplits/WinSplits.css";

function WinSplitsPage() {
    const [winsplitsData, setWinsplitsData] = useState(null);
    const [status, setStatus] = useState({
        type: "idle",
        message: "",
    })

    return (
        <div className="winsplits-page">
            <WinSplitsHeader />

            <WinSplitsInput
                onResults={setWinsplitsData}
                onStatus={setStatus}
            />

            <WinSplitsAnalyzer
                data={winsplitsData}
                status={status}
            />
        </div>
    );
}

export default WinSplitsPage;