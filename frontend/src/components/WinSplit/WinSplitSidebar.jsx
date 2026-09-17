function WinSplitSidebar({ analyses, activeAnalysis, onAnalysisSelect }) {
    return (
        <aside className="winsplit-sidebar">
            <h3>Analyser</h3>

            <div className="winsplit-sidebar-list">
                {analyses.map(({name, func}) => (
                    <button
                        key={name}
                        className={
                            activeAnalysis === func
                                ? "winsplit-sidebar-button active"
                                : "winsplit-sidebar-button"
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

export default WinSplitSidebar;