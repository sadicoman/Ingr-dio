import { useEffect, useState } from "react";
import { getUserProfile } from "../../../services/auth.service";
import { recetteService } from "../../../services/recette.service";
import "./LandingPage.scss";
import Header from "../../templates/Header/Header";
import LoaderChargement from "../../LoaderChargement/LoaderChargement";

const LandingPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [latestRecipes, setLatestRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Vérifie si c'est la première visite de l'utilisateur
    const isFirstVisit = localStorage.getItem("isFirstVisit") === null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isFirstVisit) {
                    // Marque le début du chargement
                    setLoading(true);
                    // Enregistrer que l'utilisateur a déjà visité la page
                    localStorage.setItem("isFirstVisit", "false");
                } else {
                    // Si ce n'est pas la première visite, ne pas afficher le loader
                    setLoading(false);
                }

                const profilePromise = getUserProfile();
                const recipesPromise = recetteService.getLatestRecipes(5);

                // Utiliser Promise.all pour attendre que toutes les promesses soient résolues
                const [profile, response] = await Promise.all([
                    profilePromise,
                    recipesPromise,
                ]);

                setUserInfo(profile);
                setLatestRecipes(response.data);
            } catch (err) {
                setError("Erreur lors du chargement des données");
                console.error(err);
            } finally {
                if (isFirstVisit) {
                    // Introduit un délai minimal pour l'affichage du loader
                    setTimeout(() => {
                        setLoading(false);
                    }, 3000); // 3000 ms de délai minimum pour l'affichage du loader
                }
            }
        };

        fetchData();
    }, []);

    if (loading) return <LoaderChargement />;
    if (error) return <div>{error}</div>;

    return (
        <>
            <Header />

            <main>
                <section className="section section--user">
                    {userInfo ? (
                        <h2 className="title title--niveau2">
                            Bienvenue, <span className="userInfo">{userInfo.pseudo}</span>
                        </h2>
                    ) : (
                        <h2 className="title title--niveau2">Bienvenue</h2>
                    )}
                    <p>Prêt à cuisiner quelque chose de délicieux aujourd'hui ?</p>
                </section>
                <section className="section">
                    <h3 className="title title--niveau3">Dernières Recettes Ajoutées</h3>
                    <ul className="latest-recipes__list">
                        {latestRecipes.map((recette) => (
                            <li className="latest-recipes__el" key={recette.RecetteID}>
                                <h4>{recette.Nom}</h4>
                                {/* Autres détails de la recette */}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </>
    );
};

export default LandingPage;
