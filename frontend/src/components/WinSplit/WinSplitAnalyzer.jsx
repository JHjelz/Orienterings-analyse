import WinSplitSidebar from "./WinSplitSidebar";

function WinSplitAnalyzer({ results, status }) {
    return (
        <div className="winsplit-analyzer">
            <WinSplitSidebar />

            <div className="winsplit-container">
                {!results && status.type == "idle" && (
                    <p>
                        Lim inn en WinSplit-lenke og trykk "Hent data".
                    </p>
                )}

                {status.type == "loading" && (
                    <p>
                        {status.message}
                    </p>
                )}

                {status.type == "error" && (
                    <p className="winsplit-error">
                        {status.message}
                    </p>
                )}

                {results && status.type !== "loading" && (
                    <pre>
                        {JSON.stringify(results, null, 2)}
                    </pre>
                )}
            </div>
        </div>
    );
}

export default WinSplitAnalyzer;