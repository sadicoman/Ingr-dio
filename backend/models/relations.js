const User = require("./User");
const Role = require("./Role");
const GardeManger = require("./GardeManger");
const Aliments = require("./Aliment");
const IngredientsRecettes = require("./IngredientsRecette");
const Recettes = require("./Recette");
const Etapes = require("./Etape");

// Définition des relations

// Relations User et Role
User.belongsTo(Role, { foreignKey: "RoleID" });
Role.hasMany(User, { foreignKey: "RoleID" });

// Relations GardeManger, User et Aliments
User.hasMany(GardeManger, { foreignKey: "UserID" });
Aliments.hasMany(GardeManger, { foreignKey: "AlimentID" });
GardeManger.belongsTo(User, { foreignKey: "UserID" });
GardeManger.belongsTo(Aliments, { foreignKey: "AlimentID" });

// Relations IngredientsRecettes, Aliments et Recettes
Aliments.hasMany(IngredientsRecettes, { foreignKey: "AlimentID" });
Recettes.hasMany(IngredientsRecettes, { foreignKey: "RecetteID" });
IngredientsRecettes.belongsTo(Aliments, { foreignKey: "AlimentID" });
IngredientsRecettes.belongsTo(Recettes, { foreignKey: "RecetteID" });

// Relations Recettes et Etapes
Recettes.hasMany(Etapes, { foreignKey: "RecetteID" });
Etapes.belongsTo(Recettes, { foreignKey: "RecetteID" });

module.exports = {
    User,
    Role,
    GardeManger,
    Aliments,
    IngredientsRecettes,
    Recettes,
    Etapes,
};
