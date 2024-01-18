const express = require("express");
const router = express.Router();
const alimentController = require("../controllers/aliment.controller");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/imageUpload");

// Middleware pour capturer les erreurs async
const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// Route pour obtenir tous les aliments
router.get("/", verifyToken, asyncHandler(alimentController.getAllAliments));

// Route pour obtenir un aliment par ID
router.get("/:id", verifyToken, asyncHandler(alimentController.getAlimentById));

// Route pour créer un nouvel aliment
// router.post("/", verifyToken, asyncHandler(alimentController.createAliment));

// Route pour créer un nouvel aliment (avec upload d'image)
router.post(
    "/",
    verifyToken,
    upload.single("image"),
    asyncHandler(alimentController.createAliment),
);

// Route pour créer plusieurs aliments
router.post("/createMultiple", verifyToken, alimentController.createMultipleAliments);

// Route pour mettre à jour un aliment par ID
// router.put("/:id", verifyToken, asyncHandler(alimentController.updateAliment));
router.put("/:id", verifyToken, upload.single("image"), alimentController.updateAliment);

// Route pour supprimer un aliment par ID
router.delete("/:id", verifyToken, asyncHandler(alimentController.deleteAliment));

// Middleware pour gérer les erreurs
router.use((error, req, res, next) => {
    console.error(error); // Log error
    res.status(500).send("Une erreur s'est produite");
});

module.exports = router;
