const { Sequelize, DataTypes, ModelStatic } = require("sequelize");
const { sequelize } = require("../utils/db.utils");

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

const Role = sequelize.define("Role", {
    RoleID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nom: {
        type: DataTypes.ENUM("superAdmin", "admin", "users"),
        allowNull: false,
    },
    Poids: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
});

module.exports = Role;
