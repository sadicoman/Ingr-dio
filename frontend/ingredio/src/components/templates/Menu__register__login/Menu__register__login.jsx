import { Link } from "react-router-dom";

const Menu__register__login = () => {
    return (
        <>
            <nav className="nav">
                <ul className="registerLogin__list">
                    <li className="registerLogin__el">
                        <Link to="/login">Se connecter</Link>
                    </li>
                    <li className="registerLogin__el">
                        <Link to="/register">S'enregistrer</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Menu__register__login;
