// Dans LandingPage.jsx
import { useEffect, useState } from "react";
import { getUserProfile } from "../../../services/auth.service";

const LandingPage = () => {
    const [userInfo, setUserInfo] = useState(null);

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

        fetchUserProfile();
    }, []);

    return (
        <div>
            {userInfo ? (
                <h2>Bienvenue, {userInfo.pseudo}</h2>
            ) : (
                "Chargement du profil utilisateur..."
            )}
        </div>
    );
};

export default LandingPage;
