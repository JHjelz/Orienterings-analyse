import { Link } from "react-router-dom";

function MainButton({ children, to }) {
    return (
        <Link to={to}>
            <button>
                {children}
            </button>
        </Link>
    );
}

export default MainButton;