const express = require("express");
const router = express.Router();

// POST : Inscription
router.post("/register", (req, res) => {
	// Logique d'inscription
});

// POST : Connexion
router.post("/login", (req, res) => {
	// Logique de connexion
});

// GET : Profil de l'utilisateur
router.get("/profile", (req, res) => {
	// Logique pour récupérer le profil de l'utilisateur
});

module.exports = router;
