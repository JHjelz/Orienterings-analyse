function StravaProfile() {
    return (
        <section className="strava-profile">
            <div className="strava-profile__avatar">
                N
            </div>

            <div className="strava-profile__info">
                <h2>Navn Navnesen</h2>

                <p>@navnnavnesen</p>

                <p>
                    Oslo, Norge
                </p>
            </div>

            {/*
                TODO:
                Bytt ut testdata med informasjon fra Strava API.
            */}
        </section>
    );
}

export default StravaProfile;