const express = require("express");
const router = express.Router();

// GET : Liste de toutes les recettes
router.get("/", (req, res) => {
	// Logique pour récupérer toutes les recettes
});

// POST : Ajouter une nouvelle recette
router.post("/ajouter", (req, res) => {
	// Logique pour ajouter une nouvelle recette
});

module.exports = router;
