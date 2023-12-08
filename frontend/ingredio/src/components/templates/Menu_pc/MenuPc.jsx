import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./MenuPc.scss";
import IconeAccueil from "../../../components/templates/Menu/icone/iconeAccueil";
import IconeRecettes from "../../../components/templates/Menu/icone/iconeRecettes";
import IconeGardeManger from "../../../components/templates/Menu/icone/iconeGardeManger";
import IconeAliments from "../../../components/templates/Menu/icone/iconeAliments";
import IconeProfils from "../../../components/templates/Menu/icone/iconeProfils";

const MenuPc = () => {
    const location = useLocation();
    const horiSelectorRef = useRef(null);
    const [activePath, setActivePath] = useState(location.pathname);

    useEffect(() => {
        const updateSelectorPosition = () => {
            const activeItem = document.querySelector(
                `.nav-item[data-path="${activePath}"]`,
            );
            if (activeItem) {
                const rect = activeItem.getBoundingClientRect();
                const parentRect =
                    horiSelectorRef.current.parentNode.getBoundingClientRect();

                horiSelectorRef.current.style.top = `${rect.top - parentRect.top}px`;
                horiSelectorRef.current.style.left = `${rect.left - parentRect.left}px`;

                horiSelectorRef.current.style.width = `${rect.width}px`;
                horiSelectorRef.current.style.height = `${rect.height}px`;
            }
        };

        updateSelectorPosition();

        // Ajouter un écouteur d'événement pour les redimensionnements de fenêtre
        const handleResize = () => {
            updateSelectorPosition();
        };

        window.addEventListener("resize", handleResize);

        // Nettoyage de l'effet
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [activePath]);

    const handleClick = (path) => {
        setActivePath(path); // Mettre à jour l'état du chemin actif
    };

    const menuItems = [
        {
            path: "/landingPage",
            icon: <IconeAccueil className="menu__icone" />,
            label: "Accueil",
        },
        {
            path: "/recettes",
            icon: <IconeRecettes className="menu__icone" />,
            label: "Recettes",
        },
        {
            path: "/garde-manger",
            icon: <IconeGardeManger className="menu__icone" />,
            label: "Garde-manger",
        },
        {
            path: "/aliments",
            icon: <IconeAliments className="menu__icone" />,
            label: "Aliments",
        },
        {
            path: "/profil",
            icon: <IconeProfils className="menu__icone" />,
            label: "Profil",
        },
    ];

    return (
        <nav className="navbar navbar-expand-custom navbar-mainbg">
            <ul className="navbar-nav ml-auto">
                <div className="hori-selector" ref={horiSelectorRef}>
                    <div className="left"></div>
                    <div className="right"></div>
                </div>

                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className={`nav-item ${activePath === item.path ? "active" : ""}`}
                        data-path={item.path}
                        onClick={() => handleClick(item.path)}
                    >
                        <Link className="nav-link" to={item.path}>
                            {item.icon}
                            <p>{item.label}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default MenuPc;
