const express = require("express");
const router = express.Router();
const ingredientsRecetteController = require("../controllers/ingredientsRecettes.controller");
const verifyToken = require("../middleware/verifyToken");

// Ajouter un ingrédient à une recette
router.post("/ajouter", verifyToken, ingredientsRecetteController.addIngredientToRecette);

// Obtenir tous les ingrédients d'une recette spécifique
router.get(
    "/recette/:recetteId",
    verifyToken,
    ingredientsRecetteController.getIngredientsByRecette,
);

// Mettre à jour un ingrédient spécifique dans une recette
router.put("/:id", verifyToken, ingredientsRecetteController.updateIngredientInRecette);

// Supprimer un ingrédient spécifique d'une recette
router.delete(
    "/:id",
    verifyToken,
    ingredientsRecetteController.deleteIngredientFromRecette,
);

// Ajout multiple d'ingrédient à une recette
router.post(
    "/ajouter-multiples",
    verifyToken,
    ingredientsRecetteController.ajouterPlusieursIngredients,
);

module.exports = router;
