const express = require("express");
const router = express.Router();

// Routage
const userRouter = require("./user.router");
const pantryRouter = require("./pantry.router");
const foodRouter = require("./food.router");
const recipeRouter = require("./recipe.router");

// Routage pour les différents aspects de l'application
router.use("/users", userRouter); // Pour gérer les utilisateurs
router.use("/pantry", pantryRouter); // Pour gérer le garde-manger
router.use("/food", foodRouter); // Pour gérer les aliments
router.use("/recipes", recipeRouter); // Pour gérer les recettes
router.use("/", homeRouter);

module.exports = router;
