const express = require("express");
const router = express.Router();

// Middleware pour vérifier l'authentification, si nécessaire
const isAuthenticated = (req, res, next) => {
	// Votre logique d'authentification ici
	// Si l'utilisateur est authentifié :
	// next();
	// Sinon :
	// res.redirect('/login');
	next(); // À remplacer par votre propre logique
};

// Route pour la page d'accueil
router.get("/", isAuthenticated, (req, res) => {
	res.render("index", { title: "Accueil" });
});

// Route pour une éventuelle section de la page d'accueil, par exemple des infos en temps réel
router.get("/live-info", isAuthenticated, (req, res) => {
	// Votre logique pour récupérer des infos en temps réel
	res.json({ liveInfo: "Des informations en temps réel ici" });
});

module.exports = router;
