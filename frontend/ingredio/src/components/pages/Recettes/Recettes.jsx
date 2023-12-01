import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm, useFieldArray } from "react-hook-form";
import {
	recetteService,
	ingredientsRecetteService,
	etapesService,
} from "../../../services/recette.service";
import { Link, Outlet } from "react-router-dom";
import Menu from "../../templates/Menu/Menu";
import { getUserProfile } from "../../../services/auth.service";
import { fetchGardeManger } from "../../../services/gardeManger.service";
import "./recettes.scss";

const FormulaireRecette = ({ recette, onSubmit }) => {
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
		if (recette) {
			// Initialiser les valeurs du formulaire ici si nécessaire
		}
	}, [recette]);

	const handleFormSubmit = async formData => {
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
			const ingredientsData = formData.ingredients.map(ing => ({
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
		<form onSubmit={handleSubmit(handleFormSubmit)}>
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
			<select {...register("NiveauDeDifficulte")} placeholder="Niveau de difficulté">
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

			{/* Champs dynamiques pour les ingrédients */}
			{ingredientsFields.map((field, index) => (
				<div key={field.id}>
					<input
						{...register(`ingredients.${index}.nomAliment`)}
						placeholder="Nom de l'aliment"
					/>
					<input
						{...register(`ingredients.${index}.Quantite`)}
						type="number"
						placeholder="Quantité"
					/>
					<select {...register(`ingredients.${index}.Unite`)} placeholder="Unité">
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
				onClick={() => appendIngredient({ nomAliment: "", Quantite: "", Unite: "" })}
			>
				+ Ajouter un ingrédient
			</button>

			{/* Champs dynamiques pour les étapes */}
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

			<button type="submit">Sauvegarder</button>
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

	const handleFormSubmit = async formData => {
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
			<button type="submit">Sauvegarder</button>
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

	const ajouterRecette = async data => {
		try {
			await recetteService.creerRecette(data);
			chargerRecettes(); // Recharger la liste des recettes
			setShowForm(false); // Fermer le formulaire
		} catch (error) {
			console.error("Erreur lors de l'ajout de la recette: ", error);
		}
	};

	const modifierRecette = async data => {
		try {
			await recetteService.mettreAJourRecette(recetteAModifier.RecetteID, data);
			setRecetteAModifier(null);
			// Recharger la liste des recettes
		} catch (error) {
			console.error("Erreur lors de la modification de la recette: ", error);
		}
	};

	const supprimerRecette = async id => {
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
			const alimentsIds = gardeManger.map(item => item.AlimentID);

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
	const handleEditClick = recette => {
		setRecetteAModifier(recette);
		setShowForm(true);
	};

	return (
		<>
			<Menu />
			<section>
				<h1>Recettes</h1>
				<h2>Recettes recommandées :</h2>
				{recettesRecommandees.length > 0 ? (
					recettesRecommandees.map(recette => (
						<div key={recette.RecetteID}>
							<h3>{recette.Nom}</h3>
							<p>Temps De Preparation : {recette.TempsDePreparation} min</p>
							<p>Temps De Cuisson : {recette.TempsDeCuisson} min</p>
							<p>Niveau De Difficulte : {recette.NiveauDeDifficulte}</p>
							<p>Nombre De Personnes : {recette.NombreDePersonnes}</p>
							<Link to={`/recettes/${recette.RecetteID}`} key={recette.RecetteID}>
								voir plus
							</Link>
							{/* Ajoutez d'autres informations sur la recette si nécessaire */}
						</div>
					))
				) : (
					<p>Aucune recette recommandée pour l'instant.</p>
				)}
				<h2>Liste des recettes :</h2>
				{recettes.map(recette => (
					<div key={recette.RecetteID}>
						<Link to={`/recettes/${recette.RecetteID}`} key={recette.RecetteID}>
							<div>
								<h3>{recette.Nom}</h3>
								<p>Temps De Preparation : {recette.TempsDePreparation}</p>
								<p>Temps De Cuisson : {recette.TempsDeCuisson}</p>
								<p>Niveau De Difficulte : {recette.NiveauDeDifficulte}</p>
								<p>Nombre De Personnes : {recette.NombreDePersonnes}</p>
							</div>
						</Link>
						{/* {recette.UserID === userInfo?.id && (
							<>
								<button onClick={() => handleEditClick(recette)}>Modifier</button>
								<button onClick={() => supprimerRecette(recette.RecetteID)}>
									Supprimer
								</button>
							</>
						)} */}
					</div>
				))}
			</section>
			<section className="section">
				<button onClick={handleAddClick}>Nouvelle Recette</button>
				{showForm && <FormulaireRecette onSubmit={ajouterRecette} formType={"add"} />}
			</section>
			<Outlet />
		</>
	);
};

export default Recettes;
