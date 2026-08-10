import "./Home.css"
import { useEffect, useState } from "react";
import MainButton from "../components/MainButton/MainButton";
import InfoModal from "../components/InfoModal/InfoModal";

function Home() {
  const [ message, setMessage ] = useState("");

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    fetch(`${API_URL}/api/hello/`).then(
      response => response.json()
    ).then(
      data => {
        setMessage(data.message);
      }
    );
  }, []);

  return (
    <div className="home">
      <h1>Orienteringsanalyse</h1>

      <p>{ message }</p>

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