import "./Navbar.css"
import { Link } from"react-router-dom"
import InfoModal from "../InfoModal/InfoModal";

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                🧭 Orienterings-analyse
            </Link>

            <InfoModal />
        </nav>
    );
}

export default Navbar;