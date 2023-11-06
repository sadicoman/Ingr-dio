const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/user.controller");
const { loginUser } = require("../controllers/user.controller");
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");

// POST : Inscription
router.post("/register", registerUser);

// POST : Connexion
router.post("/login", loginUser);

// GET : Profil de l'utilisateur
// Route pour obtenir les informations du profil
router.get("/profile", verifyToken, userController.getUserProfile);

// Route pour mettre à jour le profil
router.put("/profile", verifyToken, userController.updateUserProfile);

// POST : Demande de réinitialisation de mot de passe
router.post("/requestReset", userController.requestPasswordReset);

// POST : Réinitialisation de mot de passe
router.post("/resetPassword", userController.resetPassword);

module.exports = router;
