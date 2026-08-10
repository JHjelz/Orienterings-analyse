import "./Navbar.css"
import { Link } from"react-router-dom"

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                🧭 Orienterings-analyse
            </Link>

            <Link to="/" className="navbar-home">
                Hjem
            </Link>
        </nav>
    );
}

export default Navbar;