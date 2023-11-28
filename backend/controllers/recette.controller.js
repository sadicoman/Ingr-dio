const Recette = require("../models/Recette");
const IngredientsRecette = require("../models/IngredientsRecette");

const RecetteController = {
    // Créer une nouvelle recette
    createRecette: async (req, res) => {
        try {
            const userId = req.userId;
            const recette = await Recette.create({ ...req.body, UserID: userId });
            res.status(201).json(recette);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Lister toutes les recettes
    getAllRecettes: async (req, res) => {
        try {
            const recettes = await Recette.findAll();
            res.json(recettes);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Obtenir une recette par son ID
    getRecetteById: async (req, res) => {
        try {
            const recette = await Recette.findByPk(req.params.id);
            if (!recette) {
                return res.status(404).send("Recette non trouvée.");
            }
            res.json(recette);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Mettre à jour une recette
    updateRecette: async (req, res) => {
        try {
            const recette = await Recette.findByPk(req.params.id);
            if (!recette) {
                return res.status(404).send("Recette non trouvée.");
            }
            await recette.update(req.body);
            res.json(recette);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Supprimer une recette
    deleteRecette: async (req, res) => {
        try {
            const result = await Recette.destroy({ where: { RecetteID: req.params.id } });
            if (result === 0) {
                return res.status(404).send("Recette non trouvée ou déjà supprimée.");
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    getSuggestionsRecettes: async (req, res) => {
        try {
            console.log("Aliments reçus:", req.body.aliments);
            // Liste des ID d'aliments du garde-manger de l'utilisateur
            const alimentsGardeManger = req.body.aliments;
            console.log("Aliments du garde-manger:", alimentsGardeManger);

            // Recherche des recettes qui utilisent ces aliments
            const recettesPotentielles = await Recette.findAll({
                include: [
                    {
                        model: IngredientsRecette,
                        where: {
                            AlimentID: alimentsGardeManger,
                        },
                    },
                ],
            });

            console.log("Recettes potentielles trouvées:", recettesPotentielles);

            // Filtrer et trier les recettes selon vos critères
            const recettesSuggerees = filtrerEtTrierRecettes(
                recettesPotentielles,
                alimentsGardeManger,
            );

            console.log("Recettes suggérées:", recettesSuggerees);

            res.json(recettesSuggerees);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
};

function filtrerEtTrierRecettes(recettes, alimentsGardeManger) {
    return recettes.filter((recette) => {
        const ingredientsRecette = recette.IngredientsRecettes.map(
            (ing) => ing.AlimentID,
        );
        return ingredientsRecette.every((ing) => alimentsGardeManger.includes(ing));
    });
}

module.exports = RecetteController;
