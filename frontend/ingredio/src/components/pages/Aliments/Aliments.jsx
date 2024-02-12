import PropTypes from "prop-types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import AlertPopup from "../../AlertPopup/AlertPopup";

const Aliments = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [aliments, setAliments] = useState([]);
    const [nouvelAliment, setNouvelAliment] = useState("");
    const [alimentAModifier, setAlimentAModifier] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);
    const cutRef = useRef(null);
    const labelRef = useRef(null);
    const [popupInfo, setPopupInfo] = useState({ message: "", type: "" });

    useEffect(() => {
        if (labelRef.current && cutRef.current) {
            const labelWidth1 = labelRef.current.offsetWidth;
            cutRef.current.style.width = `${labelWidth1}px`;
        }
    }, []);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        fetchUserProfileAndAliments();
    }, []);

    const fetchUserProfileAndAliments = async () => {
        try {
            const profile = await getUserProfile();
            setUserInfo(profile);
            const alimentsResponse = await obtenirTousAliments();
            setAliments(alimentsResponse.data);
        } catch (error) {
            console.error("Erreur lors du chargement des données", error);
        }
    };

    // useEffect(() => {
    //     if (aliments.length > 0) {
    //         animateAliments();
    //     }
    // }, [aliments]);

    // const animateAliments = () => {
    //     gsap.fromTo(
    //         ".aliments__el",
    //         { opacity: 0, x: -200 },
    //         { opacity: 1, x: 0, duration: 1, stagger: 1 },
    //     );
    // };


    useEffect(() => {
        if (aliments.length > 0) {
            animateAliments();
        }
        return () => {
            ScrollTrigger.getAll().forEach((instance) => instance.kill());
            gsap.killTweensOf(".aliments__el");
        };
    }, [aliments]);

    const animateAliments = () => {
        gsap.fromTo(
            ".aliments__el",
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.2,
                duration: 0.5,
                scrollTrigger: {
                    trigger: ".aliments__list",
                    start: "top 75%",
                    end: "bottom 25%",
                    toggleActions: "play none none none",
                },
            }
        );
    };

    const handleAjoutAliment = async (e) => {
        e.preventDefault();
        if (!nouvelAliment) return;

        const formData = new FormData();
        formData.append("Nom", nouvelAliment);
        if (imageFile) {
            formData.append("image", imageFile, imageFile.name);
        }

        try {
            await creerAliment(formData);
            setNouvelAliment("");
            setImageFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            fetchUserProfileAndAliments(); // Re-fetch aliments
            setPopupInfo({ message: "Aliment ajouté avec succès!", type: "success" });
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'aliment", error);
            setPopupInfo({ message: "Échec de l'ajout de l'aliment.", type: "error" });
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
            setFiles((prevFiles) => [...prevFiles, e.target.files[0]]);
        }
    };

    const handleSuppressionAliment = async (id) => {
        try {
            await supprimerAliment(id);
            fetchUserProfileAndAliments(); // Refresh the aliments list after deletion
            setPopupInfo({ message: "Aliment supprimé avec succès!", type: "success" });
        } catch (error) {
            console.error("Erreur lors de la suppression de l'aliment", error);
            setPopupInfo({
                message: "Échec de la suppression de l'aliment.",
                type: "error",
            });
        }
    };

    const initierModification = (aliment) => {
        setAlimentAModifier(aliment);
    };

    const handleModification = async (id, nouvellesDonnees) => {
        try {
            await mettreAJourAliment(id, nouvellesDonnees);
            setAlimentAModifier(null);
            fetchUserProfileAndAliments(); // Refresh the aliments list after update
            setPopupInfo({ message: "Aliment modifié avec succès!", type: "success" });
        } catch (error) {
            console.error("Erreur lors de la modification de l'aliment", error);
            setPopupInfo({
                message: "Échec de la modification de l'aliment.",
                type: "error",
            });
        }
    };

    return (
        <>
            <Header />
            {popupInfo.message && (
                <AlertPopup
                    message={popupInfo.message}
                    type={popupInfo.type}
                    onClose={() => setShowPopup(false)}
                />
            )}

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
                            // placeholder="Nom de l'aliment"
                        />
                        <div
                            className={`cut ${nouvelAliment ? "cut--actif" : ""}`}
                            ref={cutRef}
                        ></div>
                        <label
                            className={`iLabel ${nouvelAliment ? "iLabel--actif" : ""}`}
                            ref={labelRef}
                        >
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
                {alimentAModifier && (
                    <FormModificationAliment
                        alimentAModifier={alimentAModifier}
                        onSubmit={handleModification}
                        onCancel={() => setAlimentAModifier(null)}
                    />
                )}
                <ul className="aliments__list">
                    {aliments.map((aliment) => (
                        <>
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
                                )}
                            </li>
                        </>
                    ))}
                </ul>
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
