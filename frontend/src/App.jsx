import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"

import StravaPage from "./pages/StravaPage"
import WinSplitsPage from "./pages/WinSplitsPage";
import CalculatorPage from "./pages/CalculatorPage";

import Navbar from "./components/Navbar/Navbar";


function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/strava" element={<StravaPage />} />
          <Route path="/winsplits" element={<WinSplitsPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App;
