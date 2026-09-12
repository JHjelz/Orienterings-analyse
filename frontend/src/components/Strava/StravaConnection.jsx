import API_URL from "../../api/config";

function StravaConnection() {
    function connectToStrava() {
        window.location.href = `${API_URL}/api/strava/connect`;
    }

    return (
        <section className="strava-connection">
            <h2>Koble til Strava</h2>

            <p>
                Koble til Strava for å hente og analysere aktivitetene dine.
            </p>

            <button onClick={connectToStrava}>
                Koble til Strava
            </button>
        </section>
    );
}

export default StravaConnection;