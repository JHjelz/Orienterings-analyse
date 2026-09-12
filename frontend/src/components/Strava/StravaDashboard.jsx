import { useState } from "react";

import StravaData from "./StravaData";
import StravaProfile from "./StravaProfile";
import StravaSidebar from "./StravaSidebar"

function StravaDashboard() {
    const [activeSection, setActiveSection] = useState("profile");

    return (
        <section className="strava-dashboard">
            
            <StravaProfile />

            <div className="strava-dashboard-body">
                
                <StravaSidebar
                    activeSection={activeSection}
                    onSectionChange={setActiveSection}
                />

                <StravaData activeSection={activeSection} />
                
            </div>
        </section>
    );
}

export default StravaDashboard;