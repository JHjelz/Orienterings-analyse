import "./MainButton.css"
import { Link } from "react-router-dom";

function MainButton({ children, to }) {
    return (
        <Link to={to}>
            <button className="main-button">
                {children}
            </button>
        </Link>
    );
}

export default MainButton;