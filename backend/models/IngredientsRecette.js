const { Sequelize, DataTypes, ModelStatic } = require("sequelize");
const { sequelize } = require("../utils/db.utils");

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

const IngredientsRecette = sequelize.define("IngredientsRecette", {
    IngredientRecetteID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    AlimentID: DataTypes.INTEGER,
    RecetteID: DataTypes.INTEGER,
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

module.exports = IngredientsRecette;
