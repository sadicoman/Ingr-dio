const express = require("express");
const router = express.Router();

// Importation des routeurs individuels
const userRouter = require("./user.router");
const roleRouter = require("./role.router");
const gardeMangerRouter = require("./gardeManger.router");
const alimentRouter = require("./aliment.router");
const ingredientsRecetteRouter = require("./ingredientsRecette.router");
const recetteRouter = require("./recette.router");
const etapeRouter = require("./etape.router");
const imageRoutes = require("./image.router");

// Routage
router.use("/users", userRouter);
router.use("/roles", roleRouter);
router.use("/gardeMangers", gardeMangerRouter);
router.use("/aliments", alimentRouter);
router.use("/ingredientsRecettes", ingredientsRecetteRouter);
router.use("/recettes", recetteRouter);
router.use("/etapes", etapeRouter);
router.use("/images", imageRoutes);

// Middleware d'erreur (à placer à la fin)
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Une erreur s’est produite");
});

module.exports = router;
