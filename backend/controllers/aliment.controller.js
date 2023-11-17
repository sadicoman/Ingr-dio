// Importation des modèles nécessaires
const Aliment = require("../models/Aliment");
const User = require("../models/User"); // Assurez-vous que le modèle User est correctement importé.

// Fonction pour normaliser le nom de l'aliment
const normalizeName = (name) => {
    return typeof name === "string" ? name.toLowerCase().trim() : "";
};

// Créer un nouvel aliment
exports.createAliment = async (req, res) => {
    const { Nom } = req.body; // Extraction du nom de l'aliment depuis le corps de la requête
    console.log(req.userId); // Utilisation de req.userId maintenant

    // Vérification pour s'assurer que Nom est fourni et est une chaîne non vide
    if (!Nom || typeof Nom !== "string" || !Nom.trim()) {
        return res.status(400).send("Le nom de l'aliment est requis.");
    }

    const nomNormalise = normalizeName(Nom); // Normalisation du nom de l'aliment

    try {
        // Vérifie si l'aliment existe déjà dans la base de données
        const existingAliment = await Aliment.findOne({ where: { Nom: nomNormalise } });

        // Si l'aliment existe déjà, renvoyer un conflit
        if (existingAliment) {
            return res.status(409).send("Cet aliment existe déjà.");
        }

        // Créer un nouvel aliment avec les données de la requête et l'ID de l'utilisateur
        const aliment = await Aliment.create({
            ...req.body,
            Nom: nomNormalise,
            UserID: req.userId, // Utilisation de req.userId
        });
        res.status(201).json(aliment); // Renvoie l'aliment créé avec le code de statut 201
    } catch (error) {
        res.status(500).send(error.message); // Gestion des erreurs serveur
    }
};

// Créer plusieurs nouveaux aliments
exports.createMultipleAliments = async (req, res) => {
    try {
        // Récupération de la liste des aliments depuis la requête
        const alimentsList = req.body; // Cela doit être un tableau d'objets aliment

        // Traitement de chaque aliment
        const processedAliments = alimentsList.map((aliment) => {
            return {
                ...aliment,
                Nom: normalizeName(aliment.Nom),
                UserID: req.userId, // Assurez-vous que req.userId est disponible
            };
        });

        // Création des aliments en base de données
        const createdAliments = await Aliment.bulkCreate(processedAliments);

        res.status(201).json(createdAliments);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Récupérer tous les aliments
exports.getAllAliments = async (req, res) => {
    try {
        const aliments = await Aliment.findAll(); // Récupération de tous les aliments
        res.status(200).json(aliments); // Renvoie la liste des aliments avec le code de statut 200
    } catch (error) {
        res.status(500).send(error.message); // Gestion des erreurs serveur
    }
};

// Récupérer un aliment par son identifiant
exports.getAlimentById = async (req, res) => {
    try {
        const aliment = await Aliment.findByPk(req.params.id); // Récupération de l'aliment par son PK (Primary Key)
        if (!aliment) {
            return res.status(404).send("Aliment non trouvé."); // Si non trouvé, renvoie un code 404
        }
        res.status(200).json(aliment); // Si trouvé, renvoie l'aliment avec un code 200
    } catch (error) {
        res.status(500).send(error.message); // Gestion des erreurs serveur
    }
};

// Mettre à jour un aliment
exports.updateAliment = async (req, res) => {
    const { id } = req.params; // Extraction de l'identifiant de l'aliment
    const { Nom } = req.body; // Extraction du nom de l'aliment
    const nomNormalise = normalizeName(Nom); // Normalisation du nom

    try {
        const aliment = await Aliment.findByPk(id); // Trouver l'aliment par son identifiant
        if (!aliment) {
            return res.status(404).send("Aliment non trouvé."); // Si non trouvé, renvoie un code 404
        }

        // Vérifier les permissions de l'utilisateur avant mise à jour
        if (aliment.UserID !== req.userId /* et d'autres vérifications de rôle */) {
            return res.status(403).send("Action non autorisée."); // Si non autorisé, renvoie un code 403
        }

        // Vérifier l'unicité du nom si changement de nom
        if (Nom && Nom !== aliment.Nom) {
            const existingAliment = await Aliment.findOne({
                where: { Nom: nomNormalise },
            });
            if (existingAliment) {
                return res.status(409).send("Un aliment avec ce nom existe déjà."); // Si le nom existe déjà, renvoie un code 409
            }
        }

        // Mise à jour de l'aliment
        await aliment.update({ Nom: nomNormalise });
        res.status(200).json(aliment); // Renvoie l'aliment mis à jour avec un code 200
    } catch (error) {
        res.status(500).send(error.message); // Gestion des erreurs serveur
    }
};

// Supprimer un aliment
exports.deleteAliment = async (req, res) => {
    const { id } = req.params; // Extraction de l'identifiant de l'aliment

    try {
        const aliment = await Aliment.findByPk(id); // Trouver l'aliment par son identifiant
        if (!aliment) {
            return res.status(404).send("Aliment non trouvé."); // Si non trouvé, renvoie un code 404
        }

        // Vérifier les permissions de l'utilisateur avant suppression
        if (aliment.UserID !== req.userId /* et d'autres vérifications de rôle */) {
            return res.status(403).send("Action non autorisée."); // Si non autorisé, renvoie un code 403
        }

        await aliment.destroy(); // Suppression de l'aliment
        res.status(200).send("Aliment supprimé avec succès."); // Confirmation de la suppression avec un code 200
    } catch (error) {
        res.status(500).send(error.message); // Gestion des erreurs serveur
    }
};

module.exports = exports; // Exportation des fonctions du contrôleur
