const bcrypt = require("bcryptjs");
const { Sequelize, DataTypes, ModelStatic } = require("sequelize");
const { sequelize } = require("../utils/db.utils");
const Role = require("./Role");

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
        allowNull: false,
    },
    Email: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false, // ne doit pas être nul
        validate: {
            isEmail: true, // valide le format de l'email
        },
    },
    MotDePasse: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(value, salt);
            this.setDataValue("MotDePasse", hashedPassword);
        },
    },
    RoleID: {
        type: DataTypes.INTEGER,
        references: {
            model: Role, // clé étrangère vers la table Role
            key: "RoleID",
        },
        defaultValue: 3, //  l'ID de rôle pour 'users'
    },
    ResetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ResetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true,
    },
});

module.exports = User;
