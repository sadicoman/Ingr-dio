/* eslint-disable react/no-unescaped-entities */
import "./Menu__register__login.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Menu__register__login = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const toggleNavigation = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const updateMedia = () => {
        setIsMobile(window.innerWidth < 768);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    return (
        <>
            <div className={`circle ${isMenuOpen ? "open" : ""}`}></div>
            <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
                <ul
                    className="registerLogin__list"
                    onClick={isMobile ? toggleNavigation : null}
                >
                    <li className="registerLogin__el">
                        <Link className="registerLogin__lien" to="/login">
                            Se connecter
                        </Link>
                    </li>
                    <li className="registerLogin__el">
                        <Link className="registerLogin__lien" to="/register">
                            S'enregistrer
                        </Link>
                    </li>
                </ul>
            </nav>
            <button
                className={`navBtn ${isMenuOpen ? "open" : ""}`}
                onClick={toggleNavigation}
            >
                <span className="btn--sanstexte">
                    <span className="btnContent">Bouton burger</span>
                </span>
                {isMenuOpen ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        className="navBtn__svg navBtn--croix"
                        display="none"
                        viewBox="0 0 24 24"
                    >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        className="navBtn__svg"
                        display="inherit"
                        viewBox="0 0 24 24"
                    >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                    </svg>
                )}
            </button>
        </>
    );
};

export default Menu__register__login;
