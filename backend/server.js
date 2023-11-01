// Import des différentes lib
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbUtils = require("./utils/db.utils");

// Management de la base de données
dbUtils.testDbConnection();

// Configuration de l'application
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routage
const baseRouter = require("./base.router");
app.use("/api", baseRouter);


// Gestion des 404
app.all("*", (req, res) => {
	res.status(404).send("Page introuvable");
});

// Gestion des erreurs globales
app.use((error, req, res, next) => {
	console.log("Error URL : ", req.url);
	console.log("Error Message : ", error.message);
	res.status(500).send("Erreur interne du serveur");
});

// Démarrage du serveur
const port = process.env.PORT || 8002;
app.listen(port, () => {
	console.log(`Serveur Web démarré sur le port : http://localhost:${port}`);
});
