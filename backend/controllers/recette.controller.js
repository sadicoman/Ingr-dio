const Recette = require("../models/Recette");

const RecetteController = {
    // Créer une nouvelle recette
    createRecette: async (req, res) => {
        try {
            const recette = await Recette.create(req.body);
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
};

module.exports = RecetteController;
