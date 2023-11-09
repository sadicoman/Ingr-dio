const { Sequelize, DataTypes, ModelStatic } = require("sequelize");
const { sequelize } = require("../utils/db.utils");

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

const Aliment = sequelize.define("Aliment", {
    AlimentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nom: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    UserID: {
        // Pour savoir qui a créé l'aliment
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Aliment;
