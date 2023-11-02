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
            "gramme",
            "litre",
            "piece",
            "cuillere a soupe",
            "cuillere a cafe",
        ),
        allowNull: false,
    },
});

module.exports = IngredientsRecette;
