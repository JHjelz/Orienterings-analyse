import { useState } from "react";

import WinSplitHeader from "../components/WinSplit/WinSplitHeader";
import WinSplitInput from "../components/WinSplit/WinSplitInput";
import WinSplitAnalyzer from "../components/WinSplit/WinSplitAnalyzer";

import "../components/WinSplit/WinSplit.css";

function WinSplitPage() {
    const [winsplitData, setWinsplitData] = useState(null);
    const [status, setStatus] = useState({
        type: "idle",
        message: "",
    })

    return (
        <div className="winsplit-page">
            <WinSplitHeader />

            <WinSplitInput
                onResults={setWinsplitData}
                onStatus={setStatus}
            />

            <WinSplitAnalyzer
                data={winsplitData}
                status={status}
            />
        </div>
    );
}

export default WinSplitPage;