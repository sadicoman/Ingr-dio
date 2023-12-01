import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { getUserProfile } from "../../../services/auth.service";
import { Link } from "react-router-dom";
import {
	recetteService,
	ingredientsRecetteService,
	etapesService,
} from "../../../services/recette.service";

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
			if (responseIngredients) {
				setIngredients(responseIngredients.data);
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

	const handleSupprimerRecette = async () => {
		try {
			await recetteService.supprimerRecette(id);
			navigate("/recettes"); // Redirection après suppression
		} catch (error) {
			console.error("Erreur lors de la suppression de la recette", error);
		}
	};

	const ingredientsFormData = ingredients.map(ing => ({
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
			ingredients: ingredients.map(ingredient => ({
				IngredientRecetteID: ingredient.IngredientRecetteID,
				nomAliment: ingredient.aliment.Nom,
				Quantite: ingredient.Quantite,
				Unite: ingredient.Unite,
			})),
			etapes: etapes,
		});
	};

	const handleFormSubmit = async formData => {
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

	return (
		<>
			<Link to={`/recettes`}>Retour</Link>
			<section>
				<h1>Recette details</h1>
				<h2>{recette.Nom}</h2>
				<p>Temps De Preparation : {recette.TempsDePreparation}</p>
				<p>Temps De Cuisson : {recette.TempsDeCuisson}</p>
				<p>Niveau De Difficulte : {recette.NiveauDeDifficulte}</p>
				<p>Nombre De Personnes : {recette.NombreDePersonnes}</p>
				<p>Calories Par Personne : {recette.CaloriesParPersonne}</p>
			</section>
			<section>
				<h2>Etapes de la recettes :</h2>
				<ol>
					{etapes.map((etape, index) => (
						<li key={etape.EtapeID}>
							Étape {index + 1}: {etape.Description}
						</li>
					))}
				</ol>
			</section>
			<section>
				<h2>Ingrédient : </h2>
				<ul>
					{ingredients.map(ingredient => (
						<li key={ingredient.IngredientRecetteID}>
							{ingredient.aliment.Nom} - Quantité: {ingredient.Quantite}{" "}
							{ingredient.Unite}
						</li>
					))}
				</ul>
			</section>
			{recette.UserID === userInfo?.id && (
				<>
					<button onClick={handleModifierRecette}>Modifier</button>
					<button onClick={handleSupprimerRecette}>Supprimer</button>
				</>
			)}
			{showForm && (
				<form onSubmit={handleSubmit(handleFormSubmit)}>
					{/* Formulaire de modification de la recette */}
					<input {...register("nom")} placeholder="Nom de la recette" />
					<input
						{...register("TempsDePreparation")}
						placeholder="Temps de préparation"
						type="number"
					/>
					<input
						{...register("TempsDeCuisson")}
						placeholder="Temps de cuisson"
						type="number"
					/>
					<select {...register("NiveauDeDifficulte")}>
						<option value="facile">Facile</option>
						<option value="moyen">Moyen</option>
						<option value="difficile">Difficile</option>
						<option value="expert">Expert</option>
					</select>
					<input
						{...register("NombreDePersonnes")}
						placeholder="Nombre de personnes"
						type="number"
					/>
					<input
						{...register("CaloriesParPersonne")}
						placeholder="Calories par personne"
						type="number"
					/>
					{/* Champs pour les ingrédients */}
					{ingredientsFields.map((field, index) => (
						<div key={field.id}>
							<input
								{...register(`ingredients.${index}.IngredientRecetteID`)}
								type="hidden"
							/>
							<input
								{...register(`ingredients.${index}.nomAliment`)}
								placeholder="Nom de l'aliment"
							/>
							<input
								{...register(`ingredients.${index}.Quantite`)}
								type="number"
								placeholder="Quantité"
							/>
							<select {...register(`ingredients.${index}.Unite`)}>
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
							<button type="button" onClick={() => removeIngredient(index)}>
								Supprimer
							</button>
						</div>
					))}
					<button
						type="button"
						onClick={() => appendIngredient({ nomAliment: "", Quantite: "", Unite: "g" })}
					>
						+ Ajouter un ingrédient
					</button>

					{/* Champs pour les étapes */}
					{etapesFields.map((field, index) => (
						<div key={field.id}>
							<textarea
								{...register(`etapes.${index}.Description`)}
								placeholder={`Description de l'étape ${index + 1}`}
							/>
							<button type="button" onClick={() => removeEtape(index)}>
								Supprimer
							</button>
						</div>
					))}
					<button type="button" onClick={() => appendEtape({ Description: "" })}>
						+ Ajouter une étape
					</button>
					<button type="submit">Sauvegarder les modifications</button>
				</form>
			)}
		</>
	);
};

export default RecetteDetails;
