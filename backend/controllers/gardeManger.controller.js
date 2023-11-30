const GardeManger = require("../models/GardeManger");
const Aliment = require("../models/Aliment");

const gardeMangerController = {

    obtenirContenu: async (req, res) => {
        try {
            const userId = req.userId;
            const contenu = await GardeManger.findAll({
                where: { UserID: userId },
                include: [
                    {
                        model: Aliment,
                        as: "aliment",
                        attributes: ["Nom"],
                    },
                ],
            });
            res.json(contenu);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    ajouterAliment: async (req, res) => {
        console.log("Données reçues:", req.body);
        try {
            const userId = req.userId;
            const { nomAliment, Quantite, Unite } = req.body;

            console.log("Nom Aliment:", nomAliment); // Log individuel
            console.log("Quantite:", Quantite);
            console.log("Unite:", Unite);

            // Log pour déboguer
            console.log("Requête reçue :", nomAliment, Quantite, Unite);

            // Trouver l'ID de l'aliment basé sur son nom
            const aliment = await Aliment.findOne({ where: { Nom: nomAliment } });

            // Log pour déboguer
            console.log("Aliment trouvé :", aliment);

            if (!aliment) {
                return res.status(404).send("Aliment non trouvé.");
            }

            const nouvelAliment = await GardeManger.create({
                UserID: userId,
                AlimentID: aliment.AlimentID, // Assurez-vous que c'est bien AlimentID
                Quantite,
                Unite,
            });

            res.status(201).json(nouvelAliment);
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'aliment :", error);
            res.status(500).send(error.message);
        }
    },

    ajouterPlusieursAliments: async (req, res) => {
        try {
            const userId = req.userId;
            const aliments = req.body; // Un tableau d'objets aliment
            const alimentsAvecUserId = aliments.map((aliment) => ({
                ...aliment,
                UserID: userId,
            }));
            const nouveauxAliments = await GardeManger.bulkCreate(alimentsAvecUserId);
            res.status(201).json(nouveauxAliments);
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
    obtenirAlimentsGardeManger: async (userId) => {
        try {
            const gardeManger = await GardeManger.findAll({
                where: { UserID: userId },
                include: [{ model: Aliment, as: "aliment" }],
            });
            return gardeManger.map((item) => item.alimentID);
        } catch (error) {
            console.error(
                "Erreur lors de la récupération des aliments du garde-manger:",
                error,
            );
            throw error;
        }
    },
};

module.exports = gardeMangerController;
