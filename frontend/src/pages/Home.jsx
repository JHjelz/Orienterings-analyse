import "./Home.css"

import MainButton from "../components/MainButton/MainButton";

function Home() {
  return (
    <div className="home">
      <div className="home-hero">
        <div className="home-badge">
          🧭 Orientering · Data · Analyse
        </div>

        <h1>Orienteringsanalyse</h1>

        <p className="home-intro">
          Analyser orienteringsdata, sammenlign prestasjoner og få bedre innsikt i løpene dine.
        </p>
      </div>

      <div className="home-buttons">
        <div className="home-tool">
          <MainButton to="/strava">
            Analyser Strava-data
          </MainButton>
          <span>Se på GPS- og løpsdata</span>
        </div>

        <div className="home-tool">
          <MainButton to="/winsplits">
            Analyser WinSplits-data
          </MainButton>
          <span>Analyser strekktider og resultater</span>
        </div>

        <div className="home-tool">
          <MainButton to="/calculator">
            Løpskalkulator
          </MainButton>
          <span>Beregn tider og fart</span>
        </div>
      </div>
    </div>
  );
}

export default Home;