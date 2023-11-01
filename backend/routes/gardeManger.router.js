const express = require("express");
const router = express.Router();

// GET : Obtenir le contenu du garde-manger
router.get("/", (req, res) => {
	// Logique pour obtenir les aliments du garde-manger
});

// POST : Ajouter un aliment au garde-manger
router.post("/ajouter", (req, res) => {
	// Logique pour ajouter un aliment
});

module.exports = router;
