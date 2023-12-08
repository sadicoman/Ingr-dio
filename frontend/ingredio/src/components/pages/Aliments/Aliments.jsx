import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../../services/auth.service";
import {
    obtenirTousAliments,
    creerAliment,
    mettreAJourAliment,
    supprimerAliment,
} from "../../../services/alimentService";
import FormModificationAliment from "./FormModificationAliment";
import Header from "../../templates/Header/Header";
import "../../btn/btn.scss";
import IconeSupprimer from "../GardeManger/iconeSupprimer";
import IconModifier from "../GardeManger/IconeModifier";

const Aliments = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [aliments, setAliments] = useState([]);
    const [nouvelAliment, setNouvelAliment] = useState("");
    const [alimentAModifier, setAlimentAModifier] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profile = await getUserProfile();
                setUserInfo(profile);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des infos utilisateur",
                    error,
                );
            }
        };

        fetchUserProfile();
        chargerAliments();
    }, []);

    const chargerAliments = async () => {
        try {
            const response = await obtenirTousAliments();
            setAliments(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des aliments", error);
        }
    };

    const handleAjoutAliment = async () => {
        if (!nouvelAliment) return;
        try {
            await creerAliment({ Nom: nouvelAliment });
            setNouvelAliment("");
            chargerAliments();
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'aliment", error);
        }
    };

    const handleSuppressionAliment = async (id) => {
        try {
            await supprimerAliment(id);
            chargerAliments();
        } catch (error) {
            console.error("Erreur lors de la suppression de l'aliment", error);
        }
    };

    const initierModification = (aliment) => {
        setAlimentAModifier(aliment);
    };

    const handleModification = async (id, nouvellesDonnees) => {
        try {
            await mettreAJourAliment(id, nouvellesDonnees);
            setAlimentAModifier(null);
            chargerAliments();
        } catch (error) {
            console.error("Erreur lors de la modification de l'aliment", error);
        }
    };

    return (
        <>
            <Header />
            <h2>Aliments</h2>
            <div>
                <input
                    type="text"
                    value={nouvelAliment}
                    onChange={(e) => setNouvelAliment(e.target.value)}
                    placeholder="Nom de l'aliment"
                />
                <button onClick={handleAjoutAliment}>Ajouter Aliment</button>
            </div>
            <ul>
                {aliments.map((aliment) => (
                    <li key={aliment.AlimentID}>
                        {aliment.Nom}
                        {aliment.UserID === userInfo?.id && (
                            <>
                                <button
                                    className="btn btn--modifier"
                                    onClick={() => initierModification(aliment)}
                                >
                                    <span className="button__text">Modifier</span>
                                    <span className="button__icon">
                                        <IconModifier />
                                    </span>
                                </button>
                                <button
                                    className="btn btn--supprimer"
                                    onClick={() =>
                                        handleSuppressionAliment(aliment.AlimentID)
                                    }
                                >
                                    <span className="button__text">Supprimer</span>
                                    <span className="button__icon">
                                        <IconeSupprimer />
                                    </span>
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            {alimentAModifier && (
                <FormModificationAliment
                    alimentAModifier={alimentAModifier}
                    onSubmit={handleModification}
                />
            )}
        </>
    );
};

Aliments.propTypes = {
    userInfo: PropTypes.shape({
        userId: PropTypes.number.isRequired,
    }),
};

export default Aliments;
