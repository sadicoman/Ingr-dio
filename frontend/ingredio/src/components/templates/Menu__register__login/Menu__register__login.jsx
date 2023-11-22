import { Link } from "react-router-dom";

const Menu__register__login = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/login">Se connecter</Link>
                    </li>
                    <li>
                        <Link to="/register">S'enregistrer</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Menu__register__login;
