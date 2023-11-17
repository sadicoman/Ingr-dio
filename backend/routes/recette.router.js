const express = require("express");
const router = express.Router();
const recetteController = require("../controllers/recette.controller");
const verifyToken = require("../middleware/verifyToken");

// Créer une nouvelle recette
router.post("/ajouter", verifyToken, recetteController.createRecette);

// Obtenir toutes les recettes
router.get("/", verifyToken, recetteController.getAllRecettes);

// Obtenir une recette spécifique par ID
router.get("/:id", verifyToken, recetteController.getRecetteById);

// Mettre à jour une recette spécifique
router.put("/:id", verifyToken, recetteController.updateRecette);

// Supprimer une recette spécifique
router.delete("/:id", verifyToken, recetteController.deleteRecette);

module.exports = router;
