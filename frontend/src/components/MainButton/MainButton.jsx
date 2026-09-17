import "./MainButton.css"
import { Link } from "react-router-dom";

function MainButton({ children, to }) {
    return (
        <Link to={to} className="main-button">
            {children}
        </Link>
    );
}

export default MainButton;