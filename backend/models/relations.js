const User = require("./User");
const Role = require("./Role");
const GardeManger = require("./GardeManger");
const Aliment = require("./Aliment");
const IngredientsRecettes = require("./IngredientsRecette");
const Recette = require("./Recette");
const Etape = require("./Etape");

// Relations User et Role
User.belongsTo(Role, { foreignKey: "RoleID" });
Role.hasMany(User, { foreignKey: "RoleID" });

// Relations User et Aliments (assumant qu'un User a plusieurs Aliments)
User.hasMany(Aliment, { foreignKey: "UserID" });
Aliment.belongsTo(User, { foreignKey: "UserID" });

// Relations GardeManger, User et Aliments
User.hasMany(GardeManger, { foreignKey: "UserID" });
Aliment.hasMany(GardeManger, { foreignKey: "AlimentID" });
GardeManger.belongsTo(User, { foreignKey: "UserID" });
GardeManger.belongsTo(Aliment, { foreignKey: "AlimentID" });

// Relations IngredientsRecettes, Aliments et Recettes
Aliment.hasMany(IngredientsRecettes, { foreignKey: "AlimentID" });
Recette.hasMany(IngredientsRecettes, { foreignKey: "RecetteID" });
IngredientsRecettes.belongsTo(Aliment, { foreignKey: "AlimentID" });
IngredientsRecettes.belongsTo(Recette, { foreignKey: "RecetteID" });

// Relations Recettes et Etapes
Recette.hasMany(Etape, { foreignKey: "RecetteID" });
Etape.belongsTo(Recette, { foreignKey: "RecetteID" });

module.exports = {
    User,
    Role,
    GardeManger,
    Aliment,
    IngredientsRecettes,
    Recette,
    Etape,
};
