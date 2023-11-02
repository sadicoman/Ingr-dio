const {Sequelize, DataTypes, ModelStatic } = require('sequelize');
const { sequelize } = require("../utils/db.utils"); 

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

const User = sequelize.define("User", {
    UserID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Pseudo: {
        type: DataTypes.STRING(50),
        unique: true,
    },
    Email: {
        type: DataTypes.STRING(50),
        unique: true,
    },
    MotDePasse: DataTypes.STRING(50),
    RoleID: DataTypes.INTEGER,
});



module.exports = User;
