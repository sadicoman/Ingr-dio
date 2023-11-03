const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/user.controller");

// POST : Inscription
router.post("/register", registerUser);

// POST : Connexion
router.post("/login", (req, res) => {
	// Logique de connexion
});

// GET : Profil de l'utilisateur
router.get("/profile", (req, res) => {
	// Logique pour récupérer le profil de l'utilisateur
});

module.exports = router;
