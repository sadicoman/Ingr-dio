// Dans LandingPage.jsx
import { useEffect, useState } from "react";
import { getUserProfile } from "../../../services/auth.service";
import { recetteService } from "../../../services/recette.service";
import "./LandingPage.scss";
import Header from "../../templates/Header/Header";

const LandingPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [latestRecipes, setLatestRecipes] = useState([]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profile = await getUserProfile();
                setUserInfo(profile);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des informations de l'utilisateur",
                    error,
                );
            }
        };

        const fetchLatestRecipes = async () => {
            try {
                const response = await recetteService.getLatestRecipes(5);
                setLatestRecipes(response.data);
            } catch (error) {
                console.error("Erreur lors du chargement des dernières recettes", error);
            }
        };

        fetchUserProfile();
        fetchLatestRecipes();
    }, []);

    return (
        <>
            <Header />

            <main>
                <section className="section">
                    {userInfo ? (
                        <h2>Bienvenue, {userInfo.pseudo}</h2>
                    ) : (
                        <h2>Bienvenue</h2>
                    )}
                    <p>Prêt à cuisiner quelque chose de délicieux aujourd'hui ?</p>
                </section>
                <section className="section">
                    <h3>Dernières Recettes Ajoutées</h3>
                    <div className="latest-recipes">
                        {latestRecipes.map((recette) => (
                            <div key={recette.RecetteID}>
                                <h4>{recette.Nom}</h4>
                                {/* Autres détails de la recette */}
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
};

export default LandingPage;
