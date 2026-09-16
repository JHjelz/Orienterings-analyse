import WinSplitHeader from "../components/WinSplit/WinSplitHeader";
import WinSplitInput from "../components/WinSplit/WinSplitInput";
import WinSplitAnalyzer from "../components/WinSplit/WinSplitAnalyzer";

import "../components/WinSplit/WinSplit.css";

function WinSplitPage() {
    return (
        <div className="winsplit-page">
            <WinSplitHeader />

            <WinSplitInput />

            <WinSplitAnalyzer />
        </div>
    );
}

export default WinSplitPage;