import API_URL from "../../api/config";

import { useState } from "react";


function WinSplitInput({ onResults, onStatus }) {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        if (!url.trim()) {
            onStatus({
                type: "error",
                message: "Skriv inn en WinSplit-lenke.",
            });

            return;
        }

        setLoading(true);
        onStatus({
            type: "loading",
            message: "Henter WinSplit-data...",
        });

        try {
            const response = await fetch(
                `${API_URL}/api/winsplit/results/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        url: url.trim(),
                    }),
                }
            );

            const contentType = response.headers.get("content-type");

            if (!response.ok) {
                if (contentType?.includes("application/json")) {
                    const data = await response.json();
                    throw new Error(data.error || "Noe gikk galt.")
                }

                const text = await response.text();
                console.error("Backend-feil:", text);

                throw new Error(
                    `Serveren svarte med HTTP ${response.status}`
                );
            }

            const data = await response.json();

            onResults(data.results);
            onStatus({
                type: "success",
                message: "WinSplit-data hentet."
            });
        } catch (error) {
            onStatus({
                type: "error",
                message: error.message,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="winsplit-input">
            <form onSubmit={handleSubmit}>
                <label htmlFor="winsplit-url">
                    Gi inn WinSplit-lenke:
                </label>

                <input
                    id="winsplit-url"
                    type="text"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    className="winsplit-input-field"
                    placeholder="https://obasen.orientering.se/..."
                />

                <button type="submit" className="winsplit-button" disabled={loading}>
                    {loading ? "Henter..." : "Hent data"}
                </button>
            </form>
        </div>
    );
}

export default WinSplitInput;