function WinSplitsSidebar({ analyses, activeAnalysis, onAnalysisSelect }) {
    return (
        <aside className="winsplits-sidebar">
            <h3>Analyser</h3>

            <div className="winsplits-sidebar-list">
                {analyses.map(({name, func}) => (
                    <button
                        key={name}
                        className={
                            activeAnalysis === func
                                ? "winsplits-sidebar-button active"
                                : "winsplits-sidebar-button"
                        }
                        onClick={() => onAnalysisSelect(() => func)}
                    >
                        {name}
                    </button>
                ))}
            </div>
        </aside>
    );
}

export default WinSplitsSidebar;