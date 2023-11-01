const express = require("express");
const router = express.Router();

// GET : Liste de tous les aliments disponibles
router.get("/", (req, res) => {
	// Logique pour récupérer tous les aliments
});

// POST : Ajouter un nouvel aliment
router.post("/ajouter", (req, res) => {
	// Logique pour ajouter un nouvel aliment
});

module.exports = router;
