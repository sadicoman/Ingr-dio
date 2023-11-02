const express = require('express');
const router = express.Router();

// Importation des routeurs individuels
const userRouter = require('./user.router');
const roleRouter = require('./role.router');
const gardeMangerRouter = require('./gardeManger.router');
const alimentRouter = require('./aliment.router');
const ingredientsRecetteRouter = require('./ingredientsRecette.router');
const recetteRouter = require('./recette.router');
const etapeRouter = require('./etape.router');

// Routage
router.use('/users', userRouter);
router.use('/roles', roleRouter);
router.use('/gardeMangers', gardeMangerRouter);
router.use('/aliments', alimentRouter);
router.use('/ingredientsRecettes', ingredientsRecetteRouter);
router.use('/recettes', recetteRouter);
router.use('/etapes', etapeRouter);

module.exports = router;
