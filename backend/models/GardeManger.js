const { Sequelize, DataTypes, ModelStatic } = require("sequelize");
const { sequelize } = require("../utils/db.utils");

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

const GardeManger = sequelize.define("GardeManger", {
    GardeMangerID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    AlimentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Quantite: DataTypes.INTEGER,
    Unite: {
        type: DataTypes.ENUM(
            "g", // pour gramme
            "l", // pour litre
            "pcs", // pour pièce
            "cs", // pour cuillère à soupe
            "cc", // pour cuillère à café
            "kg", // pour kilogramme
            "ml", // pour millilitre
            "tasse", // pour tasse
            "pincée", // pour pincée
        ),
        allowNull: false,
    },
});

module.exports = GardeManger;
