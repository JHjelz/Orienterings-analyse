function StravaData({ activeSection }) {
    const sections = {
        profile: {
            title: "Profil",
            text: "Her vil informasjon om Strava-profilen din vises.",
        },
        activities: {
            title: "Aktiviteter",
            text: "Her vil Strava-aktivitetene dine vises.",
        },
        stats: {
            title: "Statistikk",
            text: "Her vil treningsstatistikk og nøkkeltall vises.",
        },
        routes: {
            title: "Ruter",
            text: "Her vil lagrede ruter og treningsruter vises.",
        },
        analysis: {
            title: "Analyse",
            text: "Her vil analyser av treningen din vises.",
        },
    };

    const section = sections[activeSection];

    return (
        <section className="strava-data">
            <h2>{section.title}</h2>

            <p>{section.text}</p>

            {/*
                TODO:
                Koble denne delen til Strava API.
            */}
        </section>
    );
}

export default StravaData;
