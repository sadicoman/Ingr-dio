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
import IconeDownload from "../../formulaire/IconeDownload";
import IconesImagesUpload from "../../formulaire/IconesImagesUpload";

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

    // const handleAjoutAliment = async () => {
    //     if (!nouvelAliment) return;
    //     try {
    //         await creerAliment({ Nom: nouvelAliment });
    //         setNouvelAliment("");
    //         chargerAliments();
    //     } catch (error) {
    //         console.error("Erreur lors de l'ajout de l'aliment", error);
    //     }
    // };

    const [imageFile, setImageFile] = useState(null);

    const handleAjoutAliment = async () => {
        if (!nouvelAliment) return;

        // Création de FormData pour l'envoi multipart
        const formData = new FormData();
        formData.append("Nom", nouvelAliment);
        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            await creerAliment(formData);
            setNouvelAliment("");
            setImageFile(null); // Réinitialise l'état du fichier
            if (fileInputRef.current) {
                fileInputRef.current.value = ""; // Réinitialise le champ de saisie de fichier
            }
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

    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    return (
        <>
            <Header />
            <section className="section section--margin">
                <h2 className="title">Aliments</h2>
                <div className="form">
                    <h3 className="title title--niveau3">Nouvel aliment</h3>
                    <div className="input-container ic1">
                        <input
                            className="input"
                            type="text"
                            value={nouvelAliment}
                            onChange={(e) => setNouvelAliment(e.target.value)}
                        />
                        <div className="cut" ref={cutRef}></div>
                        <label className="iLabel" ref={labelRef}>
                            Nom de l'aliment
                        </label>
                    </div>
                    <div className="ic2">
                        <div className="input-container--fichier">
                            <input
                                className="input--fichier"
                                id="upload-file"
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                multiple
                            />
                            <label
                                className={`label__fichier ${
                                    files.length > 0 ? "noVisible" : ""
                                }`}
                                htmlFor="upload-file"
                            >
                                <div className="label__container">
                                    <IconeDownload className="icon" />
                                    <span>Drag and drop your files here</span>
                                    <span>or click to browse your files</span>
                                </div>
                            </label>
                            <span
                                className={`label__fichier--end ${
                                    files.length > 0 ? "visible" : ""
                                }`}
                            >
                                <div className="label__container">
                                    <IconesImagesUpload />
                                    <span className="files-counter">
                                        {files.length} file(s)
                                    </span>
                                </div>
                            </span>
                        </div>
                    </div>
                    <button className="submit" onClick={handleAjoutAliment}>
                        Ajouter Aliment
                    </button>
                </div>
                <ul className="aliments__list">
                    {aliments.map((aliment) => (
                        <li className="aliments__el" key={aliment.AlimentID}>
                            <img
                                className="aliments__img"
                                src={
                                    aliment.ImageUrl
                                        ? `http://localhost:8000${aliment.ImageUrl}`
                                        : "src/assets/images/aliments.webp"
                                }
                                alt={aliment.Nom}
                            />

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
