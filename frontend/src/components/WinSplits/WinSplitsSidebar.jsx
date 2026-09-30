function WinSplitsSidebar({ analyses, activeAnalysis, onAnalysisSelect }) {
    return (
        <aside className="winsplits-sidebar">
            <h3>Analyser</h3>

            <div className="winsplits-sidebar-list">
                {analyses.map(({ id, name }) => (
                    <button
                        key={id}
                        className={
                            activeAnalysis === id
                                ? "winsplits-sidebar-button active"
                                : "winsplits-sidebar-button"
                        }
                        onClick={() => onAnalysisSelect(id)}
                    >
                        {name}
                    </button>
                ))}
            </div>
        </aside>
    );
}

export default WinSplitsSidebar;