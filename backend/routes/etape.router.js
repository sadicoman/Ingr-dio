const express = require("express");
const router = express.Router();

const etapeController = require("../controllers/etape.controller");

// Route pour récupérer toutes les étapes
router.get("/", etapeController.getAllEtapes);

// Route pour récupérer une étape spécifique par ID
router.get("/:id", etapeController.getEtapeById);

// Route pour ajouter une nouvelle étape
router.post("/", etapeController.createEtape);

// Route pour mettre à jour une étape par ID
router.put("/:id", etapeController.updateEtape);

// Route pour supprimer une étape par ID
router.delete("/:id", etapeController.deleteEtape);

module.exports = router;
