const express = require("express");
const router = express.Router();
const etapeController = require("../controllers/etape.controller");
const verifyToken = require("../middleware/verifyToken");

// Ajouter une nouvelle étape à une recette
router.post("/ajouter", verifyToken, etapeController.addEtapeToRecette);

// Ajouter multiple de nouvelle étapes à une recette
router.post("/ajouter-multiples", verifyToken, etapeController.ajouterPlusieursEtapes);

// Obtenir toutes les étapes d'une recette spécifique
router.get("/recette/:recetteId", verifyToken, etapeController.getEtapesByRecette);

// Mettre à jour une étape spécifique
router.put("/:id", verifyToken, etapeController.updateEtapeInRecette);

// Supprimer une étape spécifique
router.delete("/:id", verifyToken, etapeController.deleteEtapeFromRecette);

module.exports = router;
