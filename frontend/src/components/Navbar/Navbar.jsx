import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import InfoModal from "../InfoModal/InfoModal";
import ThemeToggle from "../ThemeContext/ThemeToggle";

function Navbar() {
  const { pathname } = useLocation();

  const pageInfo = {
    "/": {
      title: "Om Orienterings-analyse",
      description:
        "Her får du en oversikt over verktøyene for å analysere orienteringsdata.",
    },

    "/strava": {
      title: "Om Strava-analyse",
      description: "Her kan du utforske og analysere treningsdata fra Strava.",
    },

    "/winsplits": {
      title: "Om WinSplits-analyse",
      description:
        "Her kan du analysere strekktider, mellomtider og prestasjoner fra orienteringsløp.",
    },

    "/calculator": {
      title: "Om kalkulatoren",
      description:
        "Her finner du verktøy for å beregne og sammenligne resultater.",
    },
  };

  const info = pageInfo[pathname] ?? {
    title: "Om Orienterings-analyse",
    description:
      "Velkommen til Orienterings-analyse. Velg et verktøy for å komme i gang.",
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🧭 Orienterings-analyse
      </Link>

      <InfoModal title={info.title}>
        <p>{info.description}</p>
      </InfoModal>
      <ThemeToggle />
    </nav>
  );
}

export default Navbar;
