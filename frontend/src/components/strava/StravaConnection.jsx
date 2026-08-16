import { useEffect, useState } from "react";
import API_URL from "../../api/config";

function StravaConnection() {
    const [connected,  setConnected] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/api/strava/status/`, {
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                setConnected(data.connected);
                setLoading(false);
            })
            .catch((error) => {
                console.error(
                    "Feil ved henting av Strava-status:",
                    error
                );
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Sjekker Strava-tilkobling...</p>;
    }

    if (connected) {
        return <p>✓ Strava er koblet til</p>;
    }

    return (
        <button
            onClick={() => {
                window.location.href = `${API_URL}/api/strava/connect/`;
            }}
        >
            Koble til Strava
        </button>
    );
}

export default StravaConnection;