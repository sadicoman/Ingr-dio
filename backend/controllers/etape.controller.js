const Etape = require("../models/Etape");

const EtapeController = {
    // Ajouter une nouvelle étape à une recette
    addEtapeToRecette: async (req, res) => {
        try {
            const etape = await Etape.create(req.body);
            res.status(201).json(etape);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Lister les étapes d'une recette spécifique
    getEtapesByRecette: async (req, res) => {
        try {
            const etapes = await Etape.findAll({
                where: { RecetteID: req.params.recetteId },
            });
            res.json(etapes);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Mettre à jour une étape d'une recette
    updateEtapeInRecette: async (req, res) => {
        try {
            const etape = await Etape.findOne({ where: { EtapeID: req.params.id } });
            if (!etape) {
                return res.status(404).send("Étape non trouvée.");
            }
            await etape.update(req.body);
            res.json(etape);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Supprimer une étape d'une recette
    deleteEtapeFromRecette: async (req, res) => {
        try {
            const result = await Etape.destroy({ where: { EtapeID: req.params.id } });
            if (result === 0) {
                return res.status(404).send("Étape non trouvée ou déjà supprimée.");
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    ajouterPlusieursEtapes: async (req, res) => {
        try {
            const etapes = req.body; // Un tableau d'objets étapes
            const etapesAjoutees = await Etape.bulkCreate(etapes);
            res.status(201).json(etapesAjoutees);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
};

module.exports = EtapeController;
