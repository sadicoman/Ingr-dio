const { Sequelize, DataTypes, ModelStatic } = require("sequelize");
const { sequelize } = require("../utils/db.utils");

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

const Etape = sequelize.define("Etape", {
    EtapeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    RecetteID: DataTypes.INTEGER,
    Description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Position: DataTypes.INTEGER,
});

module.exports = Etape;
