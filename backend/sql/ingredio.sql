-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 02 nov. 2023 à 16:25
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ingredio`
--

-- --------------------------------------------------------

--
-- Structure de la table `aliments`
--

CREATE TABLE `aliments` (
  `AlimentID` int(11) NOT NULL,
  `Nom` varchar(50) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `etapes`
--

CREATE TABLE `etapes` (
  `EtapeID` int(11) NOT NULL,
  `RecetteID` int(11) DEFAULT NULL,
  `Description` text NOT NULL,
  `Position` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `gardemangers`
--

CREATE TABLE `gardemangers` (
  `GardeMangerID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `AlimentID` int(11) NOT NULL,
  `Quantite` int(11) DEFAULT NULL,
  `Unite` enum('gramme','litre','piece','cuillere a soupe','cuillere a cafe') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `ingredientsrecettes`
--

CREATE TABLE `ingredientsrecettes` (
  `IngredientRecetteID` int(11) NOT NULL,
  `AlimentID` int(11) DEFAULT NULL,
  `RecetteID` int(11) DEFAULT NULL,
  `Quantite` int(11) DEFAULT NULL,
  `Unite` enum('gramme','litre','piece','cuillere a soupe','cuillere a cafe') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `recettes`
--

CREATE TABLE `recettes` (
  `RecetteID` int(11) NOT NULL,
  `Nom` varchar(50) NOT NULL,
  `TempsDePreparation` int(11) DEFAULT NULL,
  `TempsDeCuisson` int(11) DEFAULT NULL,
  `NiveauDeDifficulte` enum('facile','moyen','difficile','expert') NOT NULL,
  `NombreDePersonnes` int(11) DEFAULT NULL,
  `CaloriesParPersonne` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `RoleID` int(11) NOT NULL,
  `Nom` enum('superAdmin','admin','users') NOT NULL,
  `Poids` tinyint(4) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`RoleID`, `Nom`, `Poids`, `createdAt`, `updatedAt`) VALUES
(1, 'superAdmin', 3, '2023-11-02 16:10:09', '2023-11-02 16:10:09'),
(2, 'admin', 2, '2023-11-02 16:10:59', '2023-11-02 16:10:59'),
(3, 'users', 1, '2023-11-02 16:10:59', '2023-11-02 16:10:59');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `Pseudo` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `MotDePasse` varchar(50) DEFAULT NULL,
  `RoleID` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `aliments`
--
ALTER TABLE `aliments`
  ADD PRIMARY KEY (`AlimentID`);

--
-- Index pour la table `etapes`
--
ALTER TABLE `etapes`
  ADD PRIMARY KEY (`EtapeID`),
  ADD KEY `RecetteID` (`RecetteID`);

--
-- Index pour la table `gardemangers`
--
ALTER TABLE `gardemangers`
  ADD PRIMARY KEY (`GardeMangerID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `AlimentID` (`AlimentID`);

--
-- Index pour la table `ingredientsrecettes`
--
ALTER TABLE `ingredientsrecettes`
  ADD PRIMARY KEY (`IngredientRecetteID`),
  ADD KEY `AlimentID` (`AlimentID`),
  ADD KEY `RecetteID` (`RecetteID`);

--
-- Index pour la table `recettes`
--
ALTER TABLE `recettes`
  ADD PRIMARY KEY (`RecetteID`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`RoleID`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Pseudo` (`Pseudo`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `RoleID` (`RoleID`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `aliments`
--
ALTER TABLE `aliments`
  MODIFY `AlimentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `etapes`
--
ALTER TABLE `etapes`
  MODIFY `EtapeID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `gardemangers`
--
ALTER TABLE `gardemangers`
  MODIFY `GardeMangerID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `ingredientsrecettes`
--
ALTER TABLE `ingredientsrecettes`
  MODIFY `IngredientRecetteID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `recettes`
--
ALTER TABLE `recettes`
  MODIFY `RecetteID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `RoleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `etapes`
--
ALTER TABLE `etapes`
  ADD CONSTRAINT `etapes_ibfk_1` FOREIGN KEY (`RecetteID`) REFERENCES `recettes` (`RecetteID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `gardemangers`
--
ALTER TABLE `gardemangers`
  ADD CONSTRAINT `gardemangers_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `gardemangers_ibfk_2` FOREIGN KEY (`AlimentID`) REFERENCES `aliments` (`AlimentID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `ingredientsrecettes`
--
ALTER TABLE `ingredientsrecettes`
  ADD CONSTRAINT `ingredientsrecettes_ibfk_1` FOREIGN KEY (`AlimentID`) REFERENCES `aliments` (`AlimentID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ingredientsrecettes_ibfk_2` FOREIGN KEY (`RecetteID`) REFERENCES `recettes` (`RecetteID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`RoleID`) REFERENCES `roles` (`RoleID`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
