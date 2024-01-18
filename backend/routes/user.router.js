const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/user.controller");
const { loginUser } = require("../controllers/user.controller");
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");
const passwordValidator = require("../middleware/passwordValidator");
const emailValidator = require("../middleware/emailValidator");

// POST : Inscription
router.post("/register", passwordValidator, emailValidator, registerUser);

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
router.post("/resetPassword", passwordValidator, userController.resetPassword);

module.exports = router;
