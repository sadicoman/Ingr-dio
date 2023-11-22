import { getCurrentUserToken } from "../../../services/auth.service";

const LandingPage = () => {
    const userToken = getCurrentUserToken();

    return (
        <div>
            {userToken ? (
                <h2>Bienvenue, [Nom d'utilisateur]</h2> // Remplacer par le pseudo de l'utilisateur
            ) : (
                "Vous n'êtes pas autorisé à voir cette page."
            )}
        </div>
    );
};

export default LandingPage;
