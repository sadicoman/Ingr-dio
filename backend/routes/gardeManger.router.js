const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const gardeMangerController = require("../controllers/gardeManger.controller");

// Obtenir tous les aliments du garde-manger pour un utilisateur
router.get("/", verifyToken, gardeMangerController.obtenirContenu);

// Ajouter un nouvel aliment au garde-manger pour un utilisateur
router.post("/ajouter", verifyToken, gardeMangerController.ajouterAliment);

// Mettre à jour un aliment existant dans le garde-manger pour un utilisateur
router.put("/mettre-a-jour/:id", verifyToken, gardeMangerController.mettreAJourAliment);

// Supprimer un aliment du garde-manger pour un utilisateur
router.delete("/supprimer/:id", verifyToken, gardeMangerController.supprimerAliment);

module.exports = router;
