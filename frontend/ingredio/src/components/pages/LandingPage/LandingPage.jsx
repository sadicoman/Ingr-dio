// Dans LandingPage.jsx
import { useEffect, useState } from "react";
import { getUserProfile } from "../../../services/auth.service";
import Menu from "../../templates/Menu/Menu";

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
        <>
            <Menu />
            {userInfo ? <h2>Bienvenue, {userInfo.pseudo}</h2> : <h2>Bienvenue,</h2>}
        </>
    );
};

export default LandingPage;
