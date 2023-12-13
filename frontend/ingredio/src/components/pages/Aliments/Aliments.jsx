import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
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
import "./Aliments.scss";

const Aliments = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [aliments, setAliments] = useState([]);
    const [nouvelAliment, setNouvelAliment] = useState("");
    const [alimentAModifier, setAlimentAModifier] = useState(null);
    const labelRef = useRef(null);
    const cutRef = useRef(null);

    useEffect(() => {
        if (labelRef.current && cutRef.current) {
            const labelWidth1 = labelRef.current.offsetWidth;
            cutRef.current.style.width = `${labelWidth1}px`;
        }
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
            <section className="section">
                <h2 className="title">Aliments</h2>
                <div className="form">
                    <h3 className="title title--niveau3">Nouvel aliment</h3>
                    <div className="input-container ic1">
                        <input
                            className="input"
                            type="text"
                            value={nouvelAliment}
                            onChange={(e) => setNouvelAliment(e.target.value)}
                            // placeholder="Nom de l'aliment"
                        />
                        <div className="cut" ref={cutRef}></div>
                        <label className="iLabel" ref={labelRef}>
                            Nom de l'aliment
                        </label>
                    </div>
                    <button className="submit" onClick={handleAjoutAliment}>
                        Ajouter Aliment
                    </button>
                </div>
                <ul className="aliments__list">
                    {aliments.map((aliment) => (
                        <li className="aliments__el" key={aliment.AlimentID}>
                            <h4 className="title title--niveau5 aliment__nom">
                                {aliment.Nom}
                            </h4>
                            {aliment.UserID === userInfo?.id && (
                                <>
                                    <div className="aliment__btn">
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
                                                handleSuppressionAliment(
                                                    aliment.AlimentID,
                                                )
                                            }
                                        >
                                            <span className="button__text">
                                                Supprimer
                                            </span>
                                            <span className="button__icon">
                                                <IconeSupprimer />
                                            </span>
                                        </button>
                                    </div>
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
            </section>
        </>
    );
};

Aliments.propTypes = {
    userInfo: PropTypes.shape({
        userId: PropTypes.number.isRequired,
    }),
};

export default Aliments;
