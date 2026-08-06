import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"

import StravaPage from "./pages/StravaPage"
import WinSplitPage from "./pages/WinSplitPage";
import CalculatorPage from "./pages/CalculatorPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/strava" element={<StravaPage />} />
      <Route path="/winsplit" element={<WinSplitPage />} />
      <Route path="/calculator" element={<CalculatorPage />} />
    </Routes>
  )
}

export default App;
