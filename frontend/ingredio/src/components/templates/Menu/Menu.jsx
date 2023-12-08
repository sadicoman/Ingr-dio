import { Link, useLocation } from "react-router-dom";
import "./Menu.scss";
import IconeAccueil from "./icone/iconeAccueil";
import IconeRecettes from "./icone/iconeRecettes";
import IconeGardeManger from "./icone/iconeGardeManger";
import IconeAliments from "./icone/iconeAliments";
import IconeProfils from "./icone/iconeProfils";

// Composant Menu
const Menu = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="menu">
            <ul className="menu__liste">
                <li
                    className={`menu__el ${
                        isActive("/landingPage") ? "menu__el--actif" : ""
                    }`}
                >
                    <Link className="menu__lien" to="/landingPage">
                        <IconeAccueil className="menu__icone" />
                        <p>Accueil</p>
                    </Link>
                </li>
                <li
                    className={`menu__el ${
                        isActive("/recettes") ? "menu__el--actif" : ""
                    }`}
                >
                    <Link className="menu__lien" to="/recettes">
                        <IconeRecettes className="menu__icone" />
                        <p>Recettes</p>
                    </Link>
                </li>
                <li
                    className={`menu__el ${
                        isActive("/garde-manger") ? "menu__el--actif" : ""
                    }`}
                >
                    <Link className="menu__lien" to="/garde-manger">
                        <IconeGardeManger className="menu__icone" />
                        <p>Garde-manger</p>
                    </Link>
                </li>
                <li
                    className={`menu__el ${
                        isActive("/aliments") ? "menu__el--actif" : ""
                    }`}
                >
                    <Link className="menu__lien" to="/aliments">
                        <IconeAliments className="menu__icone" />
                        <p>Aliments</p>
                    </Link>
                </li>
                <li
                    className={`menu__el ${isActive("/profil") ? "menu__el--actif" : ""}`}
                >
                    <Link className="menu__lien" to="/profil">
                        <IconeProfils className="menu__icone" />
                        <p>Profil</p>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
