import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useForm, useFieldArray } from "react-hook-form";
import {
    recetteService,
    ingredientsRecetteService,
    etapesService,
} from "../../../services/recette.service";
import { Link, Outlet } from "react-router-dom";
import { getUserProfile } from "../../../services/auth.service";
import { fetchGardeManger } from "../../../services/gardeManger.service";
import "./recettes.scss";
import Header from "../../templates/Header/Header";
import IconeAjouter from "../GardeManger/IconeAjouter";
import IconeSupprimer from "../GardeManger/iconeSupprimer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FormulaireRecette = ({ recette, onSubmit }) => {
    const labelRefs = useRef([]);
    const cutRefs = useRef([]);

    // Ajoutez une fonction pour initialiser les références
    const addToLabelRefs = (el) => {
        if (el && !labelRefs.current.includes(el)) {
            labelRefs.current.push(el);
        }
    };

    const addToCutRefs = (el) => {
        if (el && !cutRefs.current.includes(el)) {
            cutRefs.current.push(el);
        }
    };

    const { register, handleSubmit, control, reset } = useForm({
        // Initialisation des champs par défaut
        defaultValues: {
            ingredients: [{ nomAliment: "", Quantite: "", Unite: "g" }],
            etapes: [{ Description: "" }],
        },
    });

    const {
        fields: ingredientsFields,
        append: appendIngredient,
        remove: removeIngredient,
    } = useFieldArray({
        control,
        name: "ingredients",
    });

    const {
        fields: etapesFields,
        append: appendEtape,
        remove: removeEtape,
    } = useFieldArray({
        control,
        name: "etapes",
    });

    useEffect(() => {
        labelRefs.current.forEach((labelRef, index) => {
            if (labelRef && cutRefs.current[index]) {
                const labelWidth = labelRef.offsetWidth;
                cutRefs.current[index].style.width = `${labelWidth}px`;
            }
        });
        if (recette) {
            // Initialiser les valeurs du formulaire ici si nécessaire
        }
    }, [recette]);

    const handleFormSubmit = async (formData) => {
        try {
            // Envoyer les données de base de la recette
            const recetteData = {
                Nom: formData.nom,
                TempsDePreparation: formData.tempsDePreparation,
                TempsDeCuisson: formData.TempsDeCuisson,
                NiveauDeDifficulte: formData.NiveauDeDifficulte,
                NombreDePersonnes: formData.NombreDePersonnes,
                CaloriesParPersonne: formData.CaloriesParPersonne,
                // ... autres champs de base de la recette
            };
            const responseRecette = await recetteService.creerRecette(recetteData);
            const recetteID = responseRecette.data.RecetteID;

            // Envoyer les ingrédients
            const ingredientsData = formData.ingredients.map((ing) => ({
                ...ing,
                RecetteID: recetteID,
            }));
            await ingredientsRecetteService.ajouterPlusieursIngredients(ingredientsData);

            // Envoyer les étapes
            const etapesData = formData.etapes.map((etape, index) => ({
                ...etape,
                RecetteID: recetteID,
                Position: index + 1,
            }));
            await etapesService.ajouterPlusieursEtapes(etapesData);

            reset(); // Réinitialiser le formulaire après la soumission
            // Actualiser la liste des recettes ou rediriger l'utilisateur si nécessaire
            onSubmit(formData);
        } catch (error) {
            console.error("Erreur lors de l'ajout de la recette: ", error);
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="input-container ic1">
                <input
                    className="input"
                    {...register("nom")}
                    // placeholder="Nom de la recette"
                />
                <div className="cut" ref={addToCutRefs}></div>
                <label className="iLabel" ref={addToLabelRefs}>
                    Nom de la recette
                </label>
            </div>
            <div className="input-container ic2">
                <input
                    className="input"
                    {...register("TempsDePreparation")}
                    // placeholder="Temps de préparation"
                    type="number"
                />
                <div className="cut" ref={addToCutRefs}></div>
                <label className="iLabel" ref={addToLabelRefs}>
                    Temps de préparation
                </label>
            </div>
            <div className="input-container ic2">
                <input
                    className="input"
                    {...register("TempsDeCuisson")}
                    // placeholder="Temps de cuisson"
                    type="number"
                />
                <div className="cut cut--actif" ref={addToCutRefs}></div>
                <label className="iLabel iLabel--actif" ref={addToLabelRefs}>
                    Temps de cuisson
                </label>
            </div>
            <div className="input-container ic2">
                <select
                    className="input"
                    {...register("NiveauDeDifficulte")}
                    // placeholder="Niveau de difficulté"
                >
                    <option value="facile">Facile</option>
                    <option value="moyen">Moyen</option>
                    <option value="difficile">Difficile</option>
                    <option value="expert">Expert</option>
                </select>
                <div className="cut cut--actif" ref={addToCutRefs}></div>
                <label className="iLabel iLabel--actif" ref={addToLabelRefs}>
                    Niveau de difficulté
                </label>
            </div>
            <div className="input-container ic2">
                <input
                    className="input"
                    {...register("NombreDePersonnes")}
                    // placeholder="Nombre de personnes"
                    type="number"
                />
                <div className="cut" ref={addToCutRefs}></div>
                <label className="iLabel" ref={addToLabelRefs}>
                    Nombre de personnes
                </label>
            </div>
            <div className="input-container ic2">
                <input
                    className="input"
                    {...register("CaloriesParPersonne")}
                    // placeholder="Calories par personne"
                    type="number"
                />
                <div className="cut" ref={addToCutRefs}></div>
                <label className="iLabel" ref={addToLabelRefs}>
                    Calories par personne
                </label>
            </div>

            {/* Champs dynamiques pour les ingrédients */}
            {ingredientsFields.map((field, index) => (
                <div key={field.id}>
                    <div className="input-container ic2">
                        <input
                            className="input"
                            {...register(`ingredients.${index}.nomAliment`)}
                            // placeholder="Nom de l'aliment"
                        />
                        <div className="cut" ref={addToCutRefs}></div>
                        <label className="iLabel" ref={addToLabelRefs}>
                            Nom de l'aliment
                        </label>
                    </div>
                    <div className="input-container ic2">
                        <input
                            className="input"
                            {...register(`ingredients.${index}.Quantite`)}
                            type="number"
                            // placeholder="Quantité"
                        />
                        <div className="cut" ref={addToCutRefs}></div>
                        <label className="iLabel" ref={addToLabelRefs}>
                            Quantité
                        </label>
                    </div>
                    <div className="input-container ic2">
                        <select
                            className="input"
                            {...register(`ingredients.${index}.Unite`)}
                            placeholder="Unité"
                        >
                            <option value="g">g - Gramme</option>
                            <option value="l">l - Litre</option>
                            <option value="pcs">pcs - Pièce</option>
                            <option value="cs">cs - Cuillère à soupe</option>
                            <option value="cc">cc - Cuillère à café</option>
                            <option value="kg">kg - Kilogramme</option>
                            <option value="ml">ml - Millilitre</option>
                            <option value="tasse">tasse - Tasse</option>
                            <option value="pincée">pincée - Pincée</option>
                        </select>
                        <div className="cut cut--actif" ref={addToCutRefs}></div>
                        <label className="iLabel iLabel--actif" ref={addToLabelRefs}>
                            Unité
                        </label>
                    </div>
                    <div className="input-container ic2">
                        <button
                            className="btn btn--supprimer"
                            type="button"
                            onClick={() => removeIngredient(index)}
                        >
                            <span className="button__text">Supprimer</span>
                            <span className="button__icon">
                                <IconeSupprimer />
                            </span>
                        </button>
                    </div>
                </div>
            ))}
            <div>
                <button
                    className="btn btn--add btn--ingrédient"
                    type="button"
                    onClick={() =>
                        appendIngredient({ nomAliment: "", Quantite: "", Unite: "" })
                    }
                >
                    <span className="button__text">Ajouter un ingrédient</span>
                    <span className="button__icon">
                        <IconeAjouter />
                    </span>
                </button>
            </div>

            {/* Champs dynamiques pour les étapes */}
            {etapesFields.map((field, index) => (
                <div key={field.id}>
                    <div className="input-container ic2">
                        <textarea
                            className="input"
                            {...register(`etapes.${index}.Description`)}
                            // placeholder={`Description de l'étape ${index + 1}`}
                        />
                        <div className="cut" ref={addToCutRefs}></div>
                        <label className="iLabel" ref={addToLabelRefs}>
                            {`Description de l'étape ${index + 1}`}
                        </label>
                    </div>
                    <div className="input-container ic2">
                        <button
                            className="btn btn--supprimer"
                            type="button"
                            onClick={() => removeEtape(index)}
                        >
                            <span className="button__text">Supprimer</span>
                            <span className="button__icon">
                                <IconeSupprimer />
                            </span>
                        </button>
                    </div>
                </div>
            ))}
            <button
                className="btn btn--add btn--etapes"
                type="button"
                onClick={() => appendEtape({ Description: "" })}
            >
                <span className="button__text">Ajouter une étape</span>
                <span className="button__icon">
                    <IconeAjouter />
                </span>
            </button>

            <button className="submit" type="submit">
                Sauvegarder
            </button>
        </form>
    );
};

FormulaireRecette.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    formType: PropTypes.string,
};

// Formulaire pour modifier une recette existante
const FormulaireModificationRecette = ({ recette, onSubmit }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            nom: recette.Nom,
            TempsDePreparation: recette.TempsDePreparation,
            TempsDeCuisson: recette.TempsDeCuisson,
            NiveauDeDifficulte: recette.NiveauDeDifficulte,
            NombreDePersonnes: recette.NombreDePersonnes,
            CaloriesParPersonne: recette.CaloriesParPersonne,
        },
    });

    const handleFormSubmit = async (formData) => {
        try {
            await recetteService.mettreAJourRecette(recette.RecetteID, formData);
            reset();
            onSubmit();
        } catch (error) {
            console.error("Erreur lors de la modification de la recette: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            {/* Champs du formulaire */}
            <button className="btn btn--supprimer" type="submit">
                Sauvegarder
            </button>
        </form>
    );
};

FormulaireModificationRecette.propTypes = {
    recette: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

const Recettes = () => {
    const [recettes, setRecettes] = useState([]);
    const [recetteAModifier, setRecetteAModifier] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [recettesRecommandees, setRecettesRecommandees] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const recetteContainerRef = useRef(null);

    useEffect(() => {
        const chargerRecettesEtProfil = async () => {
            try {
                const responseRecettes = await recetteService.obtenirToutesRecettes();
                setRecettes(responseRecettes.data);
                const profile = await getUserProfile();
                setUserInfo(profile);
                chargerRecettesRecommandees();
            } catch (error) {
                console.error("Erreur lors du chargement des recettes: ", error);
            }
        };
        gsap.registerPlugin(ScrollTrigger);
        chargerRecettesEtProfil();
    }, []);

    const chargerRecettes = async () => {
        try {
            const responseRecettes = await recetteService.obtenirToutesRecettes();
            setRecettes(responseRecettes.data);
        } catch (error) {
            console.error("Erreur lors du chargement des recettes: ", error);
        }
    };

    const ajouterRecette = async (data) => {
        try {
            await recetteService.creerRecette(data);
            chargerRecettes(); // Recharger la liste des recettes
            setShowForm(false); // Fermer le formulaire
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
            chargerRecettes(); // Recharger la liste des recettes après la suppression
        } catch (error) {
            console.error("Erreur lors de la suppression de la recette: ", error);
        }
    };

    const chargerRecettesRecommandees = async () => {
        try {
            // Récupération des aliments du garde-manger
            const gardeManger = await fetchGardeManger();
            // Extraction des ID des aliments
            const alimentsIds = gardeManger.map((item) => item.AlimentID);

            // Requête pour obtenir les recettes recommandées
            const response = await recetteService.obtenirSuggestionsRecettes(alimentsIds);
            setRecettesRecommandees(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des recettes recommandées: ", error);
        }
    };

    const handleAddClick = () => {
        setRecetteAModifier(null);
        setShowForm(true);
    };
    const handleEditClick = (recette) => {
        setRecetteAModifier(recette);
        setShowForm(true);
    };

    useEffect(() => {
        if (recettes.length > 0) {
            animateRecettes();
        }
        return () => {
            ScrollTrigger.getAll().forEach((instance) => instance.kill());
            gsap.killTweensOf(".recette__card");
        };
    }, [recettes]);

    const animateRecettes = () => {
        gsap.fromTo(
            ".recette__card",
            { autoAlpha: 0, y: 100 },
            {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: ".recette__container",
                    start: "top bottom", // Modifié pour déclencher dès que le haut de l'élément atteint le bas du viewport
                    end: "bottom 25%",
                    toggleActions: "play none none none",
                },
            },
        );
    };

    return (
        <>
            <Header />
            <section className="section section--margin" ref={recetteContainerRef}>
                <div className="section__recettes--container">
                    <h1 className="title">Recettes</h1>
                    <div>
                        <button className="btn btn--add" onClick={handleAddClick}>
                            <span className="button__text">Nouvelle Recette</span>
                            <span className="button__icon">
                                <IconeAjouter />
                            </span>
                        </button>
                    </div>
                </div>

                {showForm && (
                    <FormulaireRecette onSubmit={ajouterRecette} formType={"add"} />
                )}

                <h2 className="title title--niveau2">Recettes recommandées :</h2>
                <div className="recette__container">
                    {recettesRecommandees.length > 0 ? (
                        recettesRecommandees.map((recette) => (
                            <div
                                className="recette__card recette__card--recomandees"
                                key={recette.RecetteID}
                            >
                                <div className="recette__content">
                                    <h3 className="title title--niveau3">
                                        {recette.Nom}
                                    </h3>
                                    <ul className="recette__list">
                                        <li className="recette__el">
                                            <span>Temps De Preparation :</span>
                                            <span>{recette.TempsDePreparation}</span>
                                        </li>
                                        <li className="recette__el">
                                            <span>Temps De Cuisson :</span>
                                            <span>{recette.TempsDeCuisson}</span>
                                        </li>
                                        <li className="recette__el">
                                            <span>Niveau De Difficulte :</span>
                                            <span>{recette.NiveauDeDifficulte}</span>
                                        </li>
                                        <li className="recette__el">
                                            <span>Nombre De Personnes :</span>
                                            <span>{recette.NombreDePersonnes}</span>
                                        </li>
                                        <li className="recette__el">
                                            <Link
                                                to={`/recettes/${recette.RecetteID}`}
                                                key={recette.RecetteID}
                                                className="recette__lien"
                                            >
                                                voir plus
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Aucune recette recommandée pour l'instant.</p>
                    )}
                </div>
                <h2 className="title title--niveau2">Liste des recettes :</h2>
                <div className="recette__container">
                    {recettes.map((recette) => (
                        <div className="recette__card" key={recette.RecetteID}>
                            <Link
                                className="recette__content"
                                to={`/recettes/${recette.RecetteID}`}
                                key={recette.RecetteID}
                            >
                                <h3 className="title title--niveau3">{recette.Nom}</h3>
                                <ul className="recette__list">
                                    <li className="recette__el">
                                        <span>Temps de preparation :</span>
                                        <span>{recette.TempsDePreparation}</span>
                                    </li>
                                    <li className="recette__el">
                                        <span>Temps de cuisson : </span>
                                        <span>{recette.TempsDeCuisson}</span>
                                    </li>
                                    <li className="recette__el">
                                        <span>Niveau de difficulte :</span>
                                        <span>{recette.NiveauDeDifficulte}</span>
                                    </li>
                                    <li className="recette__el">
                                        <span>Nombre De Personnes :</span>
                                        <span>{recette.NombreDePersonnes}</span>
                                    </li>
                                </ul>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <Outlet />
        </>
    );
};

export default Recettes;
