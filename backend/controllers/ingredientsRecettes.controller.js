const IngredientsRecette = require("../models/IngredientsRecette");
const Aliment = require("../models/Aliment");

const IngredientsRecetteController = {
    // Ajouter un ingrédient à une recette
    addIngredientToRecette: async (req, res) => {
        try {
            const ingredient = await IngredientsRecette.create(req.body);
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
    updateIngredientInRecette: async (req, res) => {
        try {
            const ingredient = await IngredientsRecette.findOne({
                where: { IngredientRecetteID: req.params.id },
            });
            if (!ingredient) {
                return res.status(404).send("Ingrédient non trouvé.");
            }
            await ingredient.update(req.body);
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
            const ingredients = req.body; // Un tableau d'objets ingrédients
            const ingredientsAjoutes = await IngredientsRecette.bulkCreate(ingredients);
            res.status(201).json(ingredientsAjoutes);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
};

module.exports = IngredientsRecetteController;
