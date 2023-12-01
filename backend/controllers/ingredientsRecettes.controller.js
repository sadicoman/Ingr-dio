const IngredientsRecette = require("../models/IngredientsRecette");
const Aliment = require("../models/Aliment");

const IngredientsRecetteController = {
	// Ajouter un ingrédient à une recette
	addIngredientToRecette: async (req, res) => {
		try {
			const { nomAliment, RecetteID, Quantite, Unite } = req.body;
			const aliment = await Aliment.findOne({ where: { Nom: nomAliment } });

			if (!aliment) {
				return res.status(404).send("Aliment non trouvé.");
			}

			const ingredient = await IngredientsRecette.create({
				AlimentID: aliment.id,
				RecetteID,
				Quantite,
				Unite,
			});

			res.status(201).json(ingredient);
		} catch (error) {
			res.status(500).send(error.message);
		}
	},

	// Lister les ingrédients d'une recette spécifique
	getIngredientsByRecette: async (req, res) => {
		try {
			const ingredients = await IngredientsRecette.findAll({
				where: { RecetteID: req.params.recetteId },
				include: [
					{
						model: Aliment,
						as: "aliment",
						attributes: ["Nom"],
					},
				],
			});
			res.json(ingredients);
		} catch (error) {
			res.status(500).send(error.message);
		}
	},

	// Mettre à jour un ingrédient dans une recette
	// updateIngredientInRecette: async (req, res) => {
	// 	try {
	// 		const ingredient = await IngredientsRecette.findOne({
	// 			where: { IngredientRecetteID: req.params.id },
	// 		});
	// 		if (!ingredient) {
	// 			return res.status(404).send("Ingrédient non trouvé.");
	// 		}
	// 		await ingredient.update(req.body);
	// 		res.json(ingredient);
	// 	} catch (error) {
	// 		res.status(500).send(error.message);
	// 	}
	// },

	// Mettre à jour un ingrédient dans une recette
	updateIngredientInRecette: async (req, res) => {
		console.log("Mise à jour de l'ingrédient - Requête reçue:", req.body);
		try {
			const { nomAliment, RecetteID, Quantite, Unite } = req.body;
			const aliment = await Aliment.findOne({ where: { Nom: nomAliment } });
			if (!aliment) {
				console.log("Aliment non trouvé pour:", nomAliment);
				return res.status(404).send("Aliment non trouvé.");
			}

			const ingredient = await IngredientsRecette.findOne({
				where: { AlimentID: aliment.AlimentID, RecetteID: RecetteID },
			});

			if (!ingredient) {
				console.log("Ingrédient non trouvé pour:", aliment.AlimentID, RecetteID);
				return res.status(404).send("Ingrédient non trouvé.");
			}

			console.log("Mise à jour de l'ingrédient:", ingredient);
			await ingredient.update({ Quantite, Unite });
			res.json(ingredient);
		} catch (error) {
			res.status(500).send(error.message);
		}
	},

	// Supprimer un ingrédient d'une recette
	deleteIngredientFromRecette: async (req, res) => {
		try {
			const result = await IngredientsRecette.destroy({
				where: { IngredientRecetteID: req.params.id },
			});
			if (result === 0) {
				return res.status(404).send("Ingrédient non trouvé ou déjà supprimé.");
			}
			res.status(204).send();
		} catch (error) {
			res.status(500).send(error.message);
		}
	},

	// Ajouter plusieurs ingrédients à une recette
	ajouterPlusieursIngredients: async (req, res) => {
		try {
			const ingredientsData = req.body; // Un tableau d'objets ingrédients
			console.log("Requête reçue pour ajouter plusieurs ingrédients:", ingredientsData);

			const ingredientsAjoutes = [];
			const alimentsNonTrouves = [];

			for (let ingredientData of ingredientsData) {
				const { nomAliment, RecetteID, Quantite, Unite } = ingredientData;
				console.log(
					`Traitement de l'ingrédient: ${nomAliment}, RecetteID: ${RecetteID}, Quantité: ${Quantite}, Unité: ${Unite}`,
				);

				const aliment = await Aliment.findOne({ where: { Nom: nomAliment } });
				console.log(`Aliment trouvé pour ${nomAliment}:`, aliment);

				if (!aliment) {
					console.log(`Aliment non trouvé: ${nomAliment}`);
					alimentsNonTrouves.push(nomAliment);
					continue;
				}

				const ingredient = await IngredientsRecette.create({
					AlimentID: aliment.AlimentID,
					RecetteID,
					Quantite,
					Unite,
				});

				console.log(`Ingrédient ajouté: ${ingredient.IngredientRecetteID}`);
				ingredientsAjoutes.push(ingredient);
			}

			if (alimentsNonTrouves.length > 0) {
				console.log("Certains aliments n'ont pas été trouvés:", alimentsNonTrouves);
				return res.status(400).json({
					message: "Certains aliments n'ont pas été trouvés",
					alimentsNonTrouves,
				});
			}

			console.log("Ingrédients ajoutés avec succès:", ingredientsAjoutes);
			res.status(201).json(ingredientsAjoutes);
		} catch (error) {
			console.error("Erreur lors de l'ajout de plusieurs ingrédients:", error);
			res.status(500).send(error.message);
		}
	},
};

module.exports = IngredientsRecetteController;
