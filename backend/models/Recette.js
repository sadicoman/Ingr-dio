const { Sequelize, DataTypes, ModelStatic } = require("sequelize");
const { sequelize } = require("../utils/db.utils");

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */
const Recette = sequelize.define("Recette", {
    RecetteID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nom: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    TempsDePreparation: DataTypes.INTEGER,
    TempsDeCuisson: DataTypes.INTEGER,
    NiveauDeDifficulte: {
        type: DataTypes.ENUM("facile", "moyen", "difficile", "expert"),
        allowNull: false,
    },
    NombreDePersonnes: DataTypes.INTEGER,
    CaloriesParPersonne: DataTypes.INTEGER,
});

module.exports = Recette;
