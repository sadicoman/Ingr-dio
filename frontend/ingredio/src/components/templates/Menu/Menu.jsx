import { Link } from "react-router-dom";
import Logout from "../../logout/logout";

// Composant Menu
const Menu = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Accueil</Link>
                    </li>
                    <li>
                        <Link to="/recettes">Recettes</Link>
                    </li>
                    <li>
                        <Link to="/garde-manger">Garde-manger</Link>
                    </li>
                    <li>
                        <Link to="/profil">Profil</Link>
                    </li>
                    <li>
                        <Logout />
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Menu;
