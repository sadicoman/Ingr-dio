// import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home = () => {
    return (
        <div>
            <h2>Bienvenue sur Ingrédio</h2>
            <p>Description de l'application...</p>
            <ul>
                <li>
                    <Link to="/login">Se connecter</Link>
                </li>
                <li>
                    <Link to="/register">S'enregistrer</Link>
                </li>
            </ul>
        </div>
    );
};

export default Home;
