import StravaConnection from "../components/strava/StravaConnection";

function StravaPage() {
    return (
        <div className="strava-page">
            <h1>Analyser Strava-data</h1>

            <StravaConnection />
        </div>
    );
}

export default StravaPage;