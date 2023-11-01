## Structure de Projet `models`

Ce dossier contient les modèles qui définissent la structure des données. Chaque modèle peut correspondre à une table de la base de données.

- `User.js`: Modèle pour les utilisateurs.
  - Champs: `UserID`, `Pseudo`, `Email`, `MotDePasse`, etc.
- `GardeManger.js`: Modèle pour le garde-manger.
  - Champs: `GardeMangerID`, `UserID`, etc.
- `Aliment.js`: Modèle pour les aliments.
  - Champs: `AlimentID`, `Nom`, `DateExpiration`, etc.
- `Recette.js`: Modèle pour les recettes.
  - Champs: `RecetteID`, `Nom`, `TempsDePreparation`, etc.
- `Etape.js`: Modèle pour les étapes des recettes.
  - Champs: `idEtapes`, `description`, `position`, etc.
- `IngredientRecette.js`: Modèle pour les ingrédients dans les recettes.
  - Champs: `AlimentID`, `RecetteID`, `quantité`, `unité`, etc.
