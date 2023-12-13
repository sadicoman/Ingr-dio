import { useEffect, useState } from "react";
import {
    obtenirContenuGardeManger,
    ajouterAlimentGardeManger,
    supprimerAlimentGardeManger,
    mettreAJourAlimentGardeManger,
} from "../../../services/gardeManger.service";
import FormAjoutAliment from "./FormAjoutAliment";
import ListeAliments from "./ListeAliments";
import FormModificationAliment from "./FormModificationAliment";
import Header from "../../templates/Header/Header";
import "../../formulaire/formulaire.scss";
import "./GardeManger.scss";

const GardeManger = () => {
    const [aliments, setAliments] = useState([]);
    const [alimentAModifier, setAlimentAModifier] = useState(null);

    const chargerAliments = async () => {
        try {
            const contenu = await obtenirContenuGardeManger();
            setAliments(contenu);
        } catch (error) {
            console.error("Erreur lors du chargement du garde-manger: ", error);
        }
    };

    useEffect(() => {
        chargerAliments();
    }, []);

    const handleAjoutAliment = async (nouvelAliment) => {
        console.log("Données envoyées :", nouvelAliment);
        try {
            const alimentAjoute = await ajouterAlimentGardeManger(nouvelAliment);
            // Mettre à jour la liste des aliments
            setAliments((prevAliments) => [...prevAliments, alimentAjoute]);
            chargerAliments();
        } catch (error) {
            console.error("Erreur lors de l'ajout d'un aliment: ", error);
            // Affichez le message d'erreur ici
        }
    };

    const handleSuppressionAliment = async (id) => {
        try {
            await supprimerAlimentGardeManger(id);
            setAliments(aliments.filter((aliment) => aliment.GardeMangerID !== id));
        } catch (error) {
            console.error("Erreur lors de la suppression d'un aliment: ", error);
        }
    };

    const initierModification = (aliment) => {
        setAlimentAModifier(aliment);
    };

    // Fonction pour initialiser la modification
    const handleModificationAliment = async (id, updateData) => {
        try {
            const alimentModifie = await mettreAJourAlimentGardeManger(id, updateData);
            setAliments(
                aliments.map((aliment) =>
                    aliment.GardeMangerID === id ? alimentModifie : aliment,
                ),
            );
            setAlimentAModifier(null); // Réinitialiser l'aliment à modifier
            chargerAliments();
        } catch (error) {
            console.error("Erreur lors de la modification d'un aliment: ", error);
        }
    };

    // Fonction pour gérer la mise à jour réelle
    // const modifierAliment = async (id, donneesModifiees) => {
    //     try {
    //         const alimentModifie = await mettreAJourAlimentGardeManger(
    //             id,
    //             donneesModifiees,
    //         );
    //         setAliments(
    //             aliments.map((aliment) =>
    //                 aliment.GardeMangerID === id ? alimentModifie : aliment,
    //             ),
    //         );
    //         setAlimentAModifier(null); // Réinitialiser l'état après la modification
    //     } catch (error) {
    //         console.error("Erreur lors de la modification de l'aliment: ", error);
    //     }
    // };

    return (
        <div>
            <Header />
            <section className="section section--bas">
                <h1 className="title">Garde-Manger</h1>
                <FormAjoutAliment onAjout={handleAjoutAliment} />
                <ListeAliments
                    aliments={aliments}
                    onSupprimer={handleSuppressionAliment}
                    onModifier={initierModification}
                />
                {alimentAModifier && (
                    <FormModificationAliment
                        aliment={alimentAModifier}
                        onModifier={handleModificationAliment}
                        onAnnuler={() => setAlimentAModifier(null)}
                    />
                )}
            </section>
        </div>
    );
};

export default GardeManger;
