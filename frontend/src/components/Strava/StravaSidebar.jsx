function StravaSidebar({ activeSection, onSectionChange }) {
    const menuItems = [
        {
            id: "profile",
            label: "Profil",
        },
        {
            id: "activities",
            label: "Aktiviteter",
        },
        {
            id: "stats",
            label: "Statistikk",
        },
        {
            id: "routes",
            label: "Ruter",
        },
        {
            id: "analysis",
            label: "Analyse",
        },
    ];

    return (
        <aside className="strava-sidebar">
            <h3>Analyser</h3>

            <nav>
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        className={
                            activeSection === item.id
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            onSectionChange(item.id)
                        }
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
        </aside>
    );
}

export default StravaSidebar;
