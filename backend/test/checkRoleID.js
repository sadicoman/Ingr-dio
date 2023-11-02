const { Sequelize } = require("sequelize");
const Role = require("../models/Role");
// const dbConfig = require("../utils/db.utils");
require("dotenv").config();

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

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

async function getRoleInfo(roleName) {
    const role = await Role.findOne({ where: { Nom: roleName } });
    if (role) {
        return {
            id: role.RoleID,
            poids: role.Poids
        };
    }
    return null;
}


// Exécutez cette fonction et affichez le résultat :
(async () => {
    const roleInfo = await getRoleInfo("users");
    if (roleInfo) {
        console.log(`Le RoleID pour "users" est : ${roleInfo.id}`);
        console.log(`Le poids pour "users" est : ${roleInfo.poids}`);
    } else {
        console.log(`Aucun rôle trouvé pour "users"`);
    }
})();

