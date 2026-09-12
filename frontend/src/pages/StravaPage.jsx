import { useEffect, useState } from "react";

import API_URL from "../api/config";

import StravaConnection from "../components/Strava/StravaConnection";
import StravaDashboard from "../components/Strava/StravaDashboard";
import StravaMessage from "../components/Strava/StravaMessage";

import "../components/Strava/Strava.css";

function StravaPage() {
    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/strava/status/`, {
            credentials: "include",
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Kunne ikke hente Strava-status.");
            }

            return response.json();
        }).then((data) => {
            setConnected(data.connected);
        }).catch((error) => {
            console.error(error);
            setError(error.message);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <div className="strava-page">
            <h1>Analyser Strava-data</h1>

            {loading && (
                <p>Sjekker Strava-tilkobling...</p>
            )}

            {error && (
                <StravaMessage message={error} />
            )}

            {!loading && !error && !connected && (
                <StravaConnection />
            )}

            {!loading && !error && connected && (
                <StravaDashboard />
            )}
        </div>
    );
}

export default StravaPage;