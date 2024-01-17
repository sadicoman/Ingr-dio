const Sequelize = require("sequelize");
require("dotenv").config();

// Configuration de Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
);

console.log("Sequelize initialized:", !!sequelize);

// Test de la connexion
async function testDbConnection() {
    try {
        await sequelize.authenticate();
        console.log("Connexion à la base de données réussie.");
    } catch (error) {
        console.error("Impossible de se connecter à la base de données:", error);
    }
}

// Synchronisation des modèles avec la base de données
async function syncDb() {
    try {
        // Importez les modèles ici
        const models = require("../models/relations");

        // await sequelize.sync({ force: true });
        // await sequelize.sync({ alter: true });
        await sequelize.sync({});
        // ou { force: false }
        console.log("Tous les modèles ont été synchronisés avec succès.");
    } catch (error) {
        console.error("Erreur lors de la synchronisation des modèles:", error);
    }
}

module.exports = {
    sequelize,
    testDbConnection,
    syncDb,
};
