const GardeManger = require("../models/GardeManger");

const gardeMangerController = {
    // Obtenir le contenu du garde-manger de l'utilisateur
    obtenirContenu: async (req, res) => {
        try {
            const userId = req.userId;
            const contenu = await GardeManger.findAll({
                where: { UserID: userId },
            });
            res.json(contenu);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Ajouter un aliment au garde-manger de l'utilisateur
    ajouterAliment: async (req, res) => {
        try {
            const userId = req.userId;
            const { AlimentID, Quantite, Unite } = req.body;
            const nouvelAliment = await GardeManger.create({
                UserID: userId,
                AlimentID,
                Quantite,
                Unite,
            });
            res.status(201).json(nouvelAliment);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Mettre à jour un aliment dans le garde-manger de l'utilisateur
    mettreAJourAliment: async (req, res) => {
        try {
            const userId = req.userId;
            const { AlimentID, Quantite, Unite } = req.body;
            const GardeMangerID = req.params.id; // Récupération de l'ID depuis l'URL

            const aliment = await GardeManger.findOne({
                where: { GardeMangerID, UserID: userId },
            });

            if (!aliment) {
                return res.status(404).send("Aliment non trouvé dans le garde-manger.");
            }

            aliment.AlimentID = AlimentID;
            aliment.Quantite = Quantite;
            aliment.Unite = Unite;

            await aliment.save();

            res.json(aliment);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // Supprimer un aliment du garde-manger de l'utilisateur
    supprimerAliment: async (req, res) => {
        try {
            const userId = req.userId;
            const GardeMangerID = req.params.id; // Récupération de l'ID depuis l'URL

            const result = await GardeManger.destroy({
                where: { GardeMangerID, UserID: userId },
            });

            if (result === 0) {
                return res.status(404).send("Aliment non trouvé ou déjà supprimé.");
            }

            res.status(200).json({ message: "Aliment supprimé avec succès." });
        } catch (error) {
            res.status(500).json({
                message: "Erreur lors de la suppression de l'aliment.",
                error: error.message,
            });
        }
    },
};

module.exports = gardeMangerController;
