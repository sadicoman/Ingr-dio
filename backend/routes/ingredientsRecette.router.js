const express = require("express");
const router = express.Router();

// Importez le contrôleur que vous utiliserez pour gérer les requêtes
const ingredientsRecetteController = require("../controllers/ingredientsRecettes.controller");

// Exemple de route pour obtenir tous les ingredientsRecette
router.get("/", ingredientsRecetteController.getAll);

// Exemple de route pour obtenir un ingredientsRecette par ID
router.get("/:id", ingredientsRecetteController.getById);

// Exemple de route pour créer un nouveau ingredientsRecette
router.post("/", ingredientsRecetteController.create);

// Exemple de route pour mettre à jour un ingredientsRecette
router.put("/:id", ingredientsRecetteController.update);

// Exemple de route pour supprimer un ingredientsRecette
router.delete("/:id", ingredientsRecetteController.delete);

module.exports = router;
