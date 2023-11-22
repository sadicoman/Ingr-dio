require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbUtils = require("./utils/db.utils");

const app = express();

// Configuration de CORS pour accepter les requêtes de votre frontend
app.use(
    cors({
        origin: "http://127.0.0.1:5173", // URL de votre frontend
    }),
);

// Test de la connexion à la base de données
dbUtils.testDbConnection();

// Synchronisation des modèles avec la base de données
dbUtils.syncDb();

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routage (Assurez-vous d'avoir configuré les routers nécessaires)
const baseRouter = require("./routes/base.router");
app.use("/", baseRouter);

// Gestion des 404
app.all("*", (req, res) => {
    res.status(404).send("Page introuvable");
});

// Autre erreur global
app.use((error, req, res, next) => {
    console.error("Error URL : ", req.url);
    console.error("Error Message : ", error.message);
    res.status(500).send("Erreur interne du serveur");
});

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
    console.log(`Serveur Web démarré sur le port : http://localhost:${PORT}`);
});

module.exports = app;
