import "./Home.css"
import { useEffect, useState } from "react";
import MainButton from "../components/MainButton/MainButton";
import InfoModal from "../components/InfoModal/InfoModal";

function Home() {
  return (
    <div className="home">
      <h1>Orienteringsanalyse</h1>

      <div className="home-buttons">
        <MainButton to="/strava">Analyser Strava-data</MainButton><br/>
        <MainButton to="/winsplit">Analyser WinSplit-data</MainButton><br/>
        <MainButton to="calculator">Løpskalkulator</MainButton><br/>
      </div>
      
      <InfoModal />
    </div>
  );
}

export default Home;