import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { recetteService } from "../../../services/recette.service";
import { Link } from "react-router-dom";
import Menu from "../../templates/Menu/Menu";
import { getUserProfile } from "../../../services/auth.service";

const FormulaireRecette = ({ recette, onSubmit }) => {
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if (recette) {
            setValue("nom", recette.nom);
            setValue("description", recette.description);
            // Répétez pour d'autres champs si nécessaire
        }
    }, [recette, setValue]);

    const handleFormSubmit = (data) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <input {...register("nom")} placeholder="Nom de la recette" />
            <textarea {...register("description")} placeholder="Description" />
            {/* Ajoutez d'autres champs si nécessaire */}
            <button type="submit">Sauvegarder</button>
        </form>
    );
};

FormulaireRecette.propTypes = {
    recette: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
};

const Recettes = () => {
    const [recettes, setRecettes] = useState([]);
    const [recetteAModifier, setRecetteAModifier] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const chargerRecettes = async () => {
            try {
                const response = await recetteService.obtenirToutesRecettes();
                setRecettes(response.data);
                const profile = await getUserProfile();
                setUserInfo(profile);
            } catch (error) {
                console.error("Erreur lors du chargement des recettes: ", error);
            }
        };

        chargerRecettes();
    }, []);

    const ajouterRecette = async (data) => {
        try {
            await recetteService.creerRecette(data);
            setRecetteAModifier(null);
            // Recharger la liste des recettes
        } catch (error) {
            console.error("Erreur lors de l'ajout de la recette: ", error);
        }
    };

    const modifierRecette = async (data) => {
        try {
            await recetteService.mettreAJourRecette(recetteAModifier.RecetteID, data);
            setRecetteAModifier(null);
            // Recharger la liste des recettes
        } catch (error) {
            console.error("Erreur lors de la modification de la recette: ", error);
        }
    };

    const supprimerRecette = async (id) => {
        try {
            await recetteService.supprimerRecette(id);
            // Recharger la liste des recettes
        } catch (error) {
            console.error("Erreur lors de la suppression de la recette: ", error);
        }
    };

    return (
        <>
            <Menu />
            <div>
                <h1>Recettes</h1>
                {recettes.map((recette) => (
                    <div key={recette.RecetteID}>
                        <Link
                            to={`/recettes/${recette.RecetteID}`}
                            key={recette.RecetteID}
                        >
                            <div>
                                <h3>{recette.Nom}</h3>
                                <p>Temps De Preparation : {recette.TempsDePreparation}</p>
                                <p>Temps De Cuisson : {recette.TempsDeCuisson}</p>
                                <p>Niveau De Difficulte : {recette.NiveauDeDifficulte}</p>
                                <p>Nombre De Personnes : {recette.NombreDePersonnes}</p>
                            </div>
                        </Link>
                        {recette.UserID === userInfo?.id && (
                            <>
                                <button onClick={() => setRecetteAModifier(recette)}>
                                    Modifier
                                </button>
                                <button
                                    onClick={() => supprimerRecette(recette.RecetteID)}
                                >
                                    Supprimer
                                </button>
                            </>
                        )}
                    </div>
                ))}
                {recetteAModifier ? (
                    <FormulaireRecette
                        recette={recetteAModifier}
                        onSubmit={modifierRecette}
                    />
                ) : (
                    <FormulaireRecette onSubmit={ajouterRecette} />
                )}
            </div>
        </>
    );
};

export default Recettes;
