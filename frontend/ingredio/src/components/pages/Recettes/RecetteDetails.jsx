import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { getUserProfile } from "../../../services/auth.service";
import { Link } from "react-router-dom";
import {
    recetteService,
    ingredientsRecetteService,
    etapesService,
} from "../../../services/recette.service";
import IconesFleches from "../../btn/IconesFleches";
import "./recettes.scss";
import IconModifier from "../GardeManger/IconeModifier";
import IconeSupprimer from "../GardeManger/iconeSupprimer";
// import Header from "../../templates/Header/Header";

const RecetteDetails = () => {
    const [recette, setRecette] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [etapes, setEtapes] = useState([]);
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: {
            ingredients: [],
            etapes: [],
        },
    });
    const [nombreDePersonnes, setNombreDePersonnes] = useState(1);
    const [quantitesInitiales, setQuantitesInitiales] = useState([]);
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

    const chargerRecette = async () => {
        try {
            // const response = await recetteService.obtenirRecetteParId(id);
            // console.log(response);
            // response ? setRecette(response.data) : null;
            const responseRecette = await recetteService.obtenirRecetteParId(id);
            if (responseRecette) {
                setRecette(responseRecette.data);
            }

            const responseIngredients =
                await ingredientsRecetteService.obtenirIngredientsParRecette(id);
            // if (responseIngredients) {
            //     setIngredients(responseIngredients.data);
            // }
            if (responseIngredients) {
                setIngredients(responseIngredients.data);
                // Stocker les quantités initiales
                const quantites = responseIngredients.data.map((ing) => ing.Quantite);
                setQuantitesInitiales(quantites);
            }
            const responseEtapes = await etapesService.obtenirEtapesParRecette(id);
            if (responseEtapes) setEtapes(responseEtapes.data);
            const profile = await getUserProfile();
            setUserInfo(profile);
        } catch (error) {
            console.error("Erreur lors du chargement de la recette", error);
        }
    };

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

    // console.log("test");
    useEffect(() => {
        chargerRecette();
    }, [id]);

    useEffect(() => {
        // labelRefs.current.forEach((labelRef, index) => {
        //     if (labelRef && cutRefs.current[index]) {
        //         const labelWidth = labelRef.offsetWidth;
        //         cutRefs.current[index].style.width = `${labelWidth}px`;
        //     }
        // });
        if (labelRefs.current.length === cutRefs.current.length) {
            labelRefs.current.forEach((label, index) => {
                const cut = cutRefs.current[index];
                if (cut) {
                    cut.style.width = `${label.offsetWidth}px`;
                }
            });
        }
        if (recette) {
            setNombreDePersonnes(recette.NombreDePersonnes);
            setQuantitesInitiales(ingredients.map((ing) => ing.Quantite));
            // Ne pas appeler ajusterQuantites ici pour éviter le cycle
        }
    }, [recette]); // Dépendance uniquement sur recette

    useEffect(() => {
        // Cet effet se déclenchera maintenant pour chaque changement de nombreDePersonnes
        ajusterQuantites(nombreDePersonnes);
    }, [nombreDePersonnes]);

    useLayoutEffect(() => {
        labelRefs.current.forEach((labelRef, index) => {
            if (labelRef && cutRefs.current[index]) {
                const labelWidth = labelRef.offsetWidth;
                cutRefs.current[index].style.width = `${labelWidth}px`;
            }
        });
    }, [showForm]);

    const handleChangeNombreDePersonnes = (nouveauNombre) => {
        const nombre = Math.max(1, nouveauNombre);
        setNombreDePersonnes(nombre);
        // Pas besoin d'appeler ajusterQuantites ici car cela sera géré par le useEffect
    };

    const ajusterQuantites = (nouveauNombre) => {
        if (recette && quantitesInitiales.length > 0) {
            const facteur = nouveauNombre / recette.NombreDePersonnes;
            const ingredientsAjustes = ingredients.map((ingredient, index) => ({
                ...ingredient,
                Quantite: quantitesInitiales[index] * facteur,
            }));
            setIngredients(ingredientsAjustes);
        }
    };

    const handleSupprimerRecette = async () => {
        try {
            await recetteService.supprimerRecette(id);
            navigate("/recettes"); // Redirection après suppression
        } catch (error) {
            console.error("Erreur lors de la suppression de la recette", error);
        }
    };

    const ingredientsFormData = ingredients.map((ing) => ({
        nomAliment: ing.aliment.Nom,
        Quantite: ing.Quantite,
        Unite: ing.Unite,
    }));

    const handleModifierRecette = () => {
        setShowForm(true);
        reset({
            nom: recette.Nom,
            TempsDePreparation: recette.TempsDePreparation,
            TempsDeCuisson: recette.TempsDeCuisson,
            NiveauDeDifficulte: recette.NiveauDeDifficulte,
            NombreDePersonnes: recette.NombreDePersonnes,
            CaloriesParPersonne: recette.CaloriesParPersonne,
            // ingredients: recette.Ingredients, // Supposant que recette.Ingredients contient les ingrédients
            // etapes: recette.Etapes, // Supposant que recette.Etapes contient les étapes
            // ingredients: ingredients,
            ingredients: ingredients.map((ingredient) => ({
                IngredientRecetteID: ingredient.IngredientRecetteID,
                nomAliment: ingredient.aliment.Nom,
                Quantite: ingredient.Quantite,
                Unite: ingredient.Unite,
            })),
            etapes: etapes,
        });
    };

    const handleFormSubmit = async (formData) => {
        console.log("Form Data:", formData);
        try {
            // Mettre à jour les informations de base de la recette
            await recetteService.mettreAJourRecette(id, formData);

            // Mettre à jour chaque ingrédient individuellement
            for (const ingredient of formData.ingredients) {
                console.log(ingredient.IngredientRecetteID);
                if (ingredient.IngredientRecetteID) {
                    await ingredientsRecetteService.mettreAJourIngredient(
                        ingredient.IngredientRecetteID,
                        {
                            nomAliment: ingredient.nomAliment,
                            Quantite: ingredient.Quantite,
                            Unite: ingredient.Unite,
                            RecetteID: id, // Assurez-vous que cet ID est correct et non undefined
                        },
                    );
                }
            }

            // Mettre à jour chaque étape individuellement
            for (const etape of formData.etapes) {
                if (etape.EtapeID) {
                    await etapesService.mettreAJourEtape(etape.EtapeID, etape);
                }
            }

            // Recharger les données de la recette et réinitialiser le formulaire
            chargerRecette();
            reset();
            setShowForm(false);
        } catch (error) {
            console.error("Erreur lors de la modification de la recette: ", error);
        }
    };

    if (!recette) {
        return <div>Chargement...</div>;
    }

    const augmenterQuantite = () => {
        if (nombreDePersonnes < Number.MAX_SAFE_INTEGER) {
            setNombreDePersonnes(nombreDePersonnes + 1);
        }
    };

    const diminuerQuantite = () => {
        if (nombreDePersonnes > 1) {
            setNombreDePersonnes(nombreDePersonnes - 1);
        }
    };

    return (
        <>
            {/* <Header /> */}
            <div className="section section__recetteDetails">
                <div className="conainner__btn">
                    <Link className="btn btn--modifier btn--retour" to={`/recettes`}>
                        <span className="button__icon">
                            <IconesFleches />
                        </span>
                        <span className="button__text">Retour</span>
                    </Link>
                    {recette.UserID === userInfo?.id && (
                        <>
                            <div className="containner__second">
                                <button
                                    className="btn btn--modifier"
                                    onClick={handleModifierRecette}
                                >
                                    <span className="button__text">Modifier</span>
                                    <span className="button__icon">
                                        <IconModifier />
                                    </span>
                                </button>
                                <button
                                    className="btn btn--supprimer"
                                    onClick={handleSupprimerRecette}
                                >
                                    <span className="button__text">Supprimer</span>
                                    <span className="button__icon">
                                        <IconeSupprimer />
                                    </span>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {/* <div className="section">
                {recette.UserID === userInfo?.id && (
                    <>
                        <div>
                            <button onClick={handleModifierRecette}>Modifier</button>
                            <button onClick={handleSupprimerRecette}>Supprimer</button>
                        </div>
                    </>
                )}
            </div> */}
            <section className="section">
                <h1 className="title">{recette.Nom}</h1>
                <ul className="primary__list">
                    <li className="primary__el">
                        <p>Temps De Preparation : {recette.TempsDePreparation}</p>
                    </li>
                    <li className="primary__el">
                        <p>Temps De Cuisson : {recette.TempsDeCuisson}</p>
                    </li>
                    <li className="primary__el ">
                        <p>
                            Niveau De Difficulte :{" "}
                            <span className="primary__difficulte">
                                {recette.NiveauDeDifficulte}
                            </span>
                        </p>
                    </li>
                    <li className="primary__el">
                        <p>Nombre De Personnes : {recette.NombreDePersonnes}</p>
                    </li>
                    <li className="primary__el">
                        <p>Calories Par Personne : {recette.CaloriesParPersonne}</p>
                    </li>
                </ul>
            </section>
            <section className="section">
                <h2 className="title title--niveau2">Ingrédient : </h2>
                {/* <input
                    type="number"
                    value={nombreDePersonnes}
                    onChange={(e) =>
                        handleChangeNombreDePersonnes(Number(e.target.value))
                    }
                    min="1"
                /> */}
                <div className="form">
                    <div className="input-container ic2">
                        <div className="containner__quantite containner__quantite--actif">
                            <button
                                className="btn--moin"
                                type="button"
                                onClick={diminuerQuantite}
                            >
                                -
                            </button>
                            <input
                                className="input input--quantite"
                                type="number"
                                value={nombreDePersonnes}
                                onChange={(e) =>
                                    handleChangeNombreDePersonnes(Number(e.target.value))
                                }
                                min="1"
                            />
                            <button
                                className="btn--plus"
                                type="button"
                                onClick={augmenterQuantite}
                            >
                                +
                            </button>
                            <div
                                className="cut cut--nombreDePersonne"
                                ref={addToCutRefs}
                            ></div>
                            <label
                                className="iLabel ilabel--quantite"
                                ref={addToLabelRefs}
                            >
                                Nombre De Personnes
                            </label>
                        </div>
                    </div>
                </div>
                <ul className="ingredient__list">
                    {ingredients.map((ingredient) => (
                        <li
                            className="ingredient__el"
                            key={ingredient.IngredientRecetteID}
                        >
                            <img
                                className="aliments__img"
                                src={
                                    ingredient.ImageUrl
                                        ? `http://localhost:8000${ingredient.ImageUrl}`
                                        : "/src/assets/images/aliments.webp"
                                }
                                alt={ingredient.aliment.Nom}
                            />
                            <h3 className="title title--niveau5 ingredient__nom">
                                {ingredient.aliment.Nom}
                            </h3>

                            <p>
                                {ingredient.Quantite} {ingredient.Unite}
                            </p>
                        </li>
                    ))}
                </ul>
            </section>
            <section className="section">
                <h2 className="title title--niveau2">Préparation :</h2>
                <ol className="etapes__liste">
                    {etapes.map((etape, index) => (
                        <li className="etapes__el" key={etape.EtapeID}>
                            <h3 className="title title--niveau3">Étape {index + 1}:</h3>
                            <p>{etape.Description}</p>
                        </li>
                    ))}
                </ol>
            </section>

            <div className="section">
                {showForm && (
                    <div className="form__recetteDetails">
                        <form
                            className="form form--recetteDetails"
                            onSubmit={handleSubmit(handleFormSubmit)}
                        >
                            <div className="form__fermer">
                                <button
                                    className="fermer__btn"
                                    onClick={() => setShowForm(false)}
                                >
                                    X
                                </button>
                            </div>
                            <div className="ingredients__container ingredients__container--first">
                                {/* Formulaire de modification de la recette */}
                                <div className="input-container ic2">
                                    <input
                                        className="input"
                                        {...register("nom")}
                                        // placeholder="Nom de la recette"
                                    />
                                    <div
                                        className="cut cut--actif"
                                        ref={addToCutRefs}
                                    ></div>
                                    <label
                                        className="iLabel iLabel--actif"
                                        ref={addToLabelRefs}
                                    >
                                        Nom de la recette
                                    </label>
                                </div>
                                <div className="input-container ic2">
                                    {/* ici */}
                                    <input
                                        className="input"
                                        {...register("TempsDePreparation")}
                                        // placeholder="Temps de préparation"
                                        type="number"
                                    />
                                    <div
                                        className="cut cut--actif"
                                        ref={addToCutRefs}
                                    ></div>
                                    <label
                                        className="iLabel iLabel--actif"
                                        ref={addToLabelRefs}
                                    >
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
                                    <div
                                        className="cut cut--actif"
                                        ref={addToCutRefs}
                                    ></div>
                                    <label
                                        className="iLabel iLabel--actif"
                                        ref={addToLabelRefs}
                                    >
                                        Temps de cuisson
                                    </label>
                                </div>
                                <div className="input-container ic2">
                                    <select
                                        className="input"
                                        {...register("NiveauDeDifficulte")}
                                    >
                                        <option value="facile">Facile</option>
                                        <option value="moyen">Moyen</option>
                                        <option value="difficile">Difficile</option>
                                        <option value="expert">Expert</option>
                                    </select>
                                </div>
                                <div className="input-container ic2">
                                    <input
                                        className="input"
                                        {...register("NombreDePersonnes")}
                                        // placeholder="Nombre de personnes"
                                        type="number"
                                    />
                                    <div
                                        className="cut cut--actif"
                                        ref={addToCutRefs}
                                    ></div>
                                    <label
                                        className="iLabel iLabel--actif"
                                        ref={addToLabelRefs}
                                    >
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
                                    <div
                                        className="cut cut--actif"
                                        ref={addToCutRefs}
                                    ></div>
                                    <label
                                        className="iLabel iLabel--actif"
                                        ref={addToLabelRefs}
                                    >
                                        Calories par personne
                                    </label>
                                </div>
                            </div>
                            {/* Champs pour les ingrédients */}
                            {ingredientsFields.map((field, index) => (
                                <div className="ingredients__container" key={field.id}>
                                    <div className="input-container ic2 input-container--invisible">
                                        <input
                                            className="input"
                                            {...register(
                                                `ingredients.${index}.IngredientRecetteID`,
                                            )}
                                            type="hidden"
                                        />
                                    </div>
                                    <div className="btn--supprimer">
                                        <button
                                            type="button"
                                            onClick={() => removeIngredient(index)}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                    <div className="input-container ic2">
                                        <input
                                            className="input"
                                            {...register(
                                                `ingredients.${index}.nomAliment`,
                                            )}
                                            // placeholder="Nom de l'aliment"
                                        />
                                        <div
                                            className="cut cut--actif"
                                            ref={addToCutRefs}
                                        ></div>
                                        <label
                                            className="iLabel iLabel--actif"
                                            ref={addToLabelRefs}
                                        >
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
                                        <div
                                            className="cut cut--actif"
                                            ref={addToCutRefs}
                                        ></div>
                                        <label
                                            className="iLabel iLabel--actif"
                                            ref={addToLabelRefs}
                                        >
                                            Quantité
                                        </label>
                                    </div>
                                    <div className="input-container ic2 input-container--bottom">
                                        <select
                                            className="input"
                                            {...register(`ingredients.${index}.Unite`)}
                                        >
                                            <option value="g">g - Gramme</option>
                                            <option value="l">l - Litre</option>
                                            <option value="pcs">pcs - Pièce</option>
                                            <option value="cs">
                                                cs - Cuillère à soupe
                                            </option>
                                            <option value="cc">
                                                cc - Cuillère à café
                                            </option>
                                            <option value="kg">kg - Kilogramme</option>
                                            <option value="ml">ml - Millilitre</option>
                                            <option value="tasse">tasse - Tasse</option>
                                            <option value="pincée">
                                                pincée - Pincée
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                            <div className="input-container ic2">
                                <button
                                    className="input-container__btn"
                                    type="button"
                                    onClick={() =>
                                        appendIngredient({
                                            nomAliment: "",
                                            Quantite: "",
                                            Unite: "g",
                                        })
                                    }
                                >
                                    + Ajouter un ingrédient
                                </button>
                            </div>
                            {/* Champs pour les étapes */}

                            <div className="etapes__section ingredients__container">
                                {etapesFields.map((field, index) => (
                                    <div className="etapes__container" key={field.id}>
                                        <div className="btn--supprimer">
                                            <button
                                                type="button"
                                                onClick={() => removeEtape(index)}
                                            >
                                                Supprimer
                                            </button>
                                        </div>

                                        <div className="input-container ic2">
                                            <textarea
                                                className="input input--textarea"
                                                {...register(
                                                    `etapes.${index}.Description`,
                                                )}
                                                // placeholder={`Description de l'étape ${
                                                //     index + 1
                                                // }`}
                                            />
                                            <div
                                                className="cut cut--actif cut--etape"
                                                ref={addToCutRefs}
                                            ></div>
                                            <label
                                                className="iLabel iLabel--actif"
                                                ref={addToLabelRefs}
                                            >
                                                {`Description de l'étape ${index + 1}`}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                                <div className="input-container ic2">
                                    <button
                                        className="input-container__btn input-container__btn--etape "
                                        type="button"
                                        onClick={() => appendEtape({ Description: "" })}
                                    >
                                        + Ajouter une étape
                                    </button>
                                </div>
                            </div>
                            <div>
                                <button className="submit" type="submit">
                                    Sauvegarder les modifications
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default RecetteDetails;
