-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 29 nov. 2023 à 12:30
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
  `UserID` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `aliments`
--

INSERT INTO `aliments` (`AlimentID`, `Nom`, `UserID`, `createdAt`, `updatedAt`) VALUES
(1, 'pomme jonagold', 2, '2023-11-09 11:36:37', '2023-11-09 11:50:04'),
(2, 'banane', 2, '2023-11-09 11:36:50', '2023-11-09 11:36:50'),
(3, 'carotte', 2, '2023-11-09 11:36:58', '2023-11-09 11:36:58'),
(4, 'tomate', 2, '2023-11-09 11:37:06', '2023-11-09 11:37:06'),
(5, 'concombre', 2, '2023-11-09 11:37:15', '2023-11-09 11:37:15'),
(6, 'salade', 2, '2023-11-09 11:37:41', '2023-11-09 11:37:41'),
(7, 'fraise', 2, '2023-11-09 11:37:49', '2023-11-09 11:37:49'),
(8, 'cerise', 2, '2023-11-09 11:37:56', '2023-11-09 11:37:56'),
(9, 'melon', 2, '2023-11-09 11:38:03', '2023-11-09 11:38:03'),
(10, 'poire', 2, '2023-11-09 14:25:35', '2023-11-09 14:25:35'),
(11, 'pastèque', 2, '2023-11-09 14:21:40', '2023-11-09 14:21:40'),
(12, 'farine', 2, '2023-11-16 15:07:29', '2023-11-16 15:07:29'),
(15, 'maïs', 2, '2023-11-17 18:35:45', '2023-11-17 18:35:45'),
(17, 'cornichon', 2, '2023-11-24 15:24:52', '2023-11-24 19:15:19'),
(18, 'sucre', 2, '2023-11-24 19:15:37', '2023-11-24 19:15:37'),
(19, 'riz (sushi)', 2, '2023-11-27 15:24:26', '2023-11-27 15:24:26'),
(20, 'steak', 2, '2023-11-27 15:24:26', '2023-11-27 15:24:26'),
(21, 'saumon cru', 2, '2023-11-27 15:24:26', '2023-11-27 15:24:26'),
(22, 'edamame', 2, '2023-11-27 15:24:26', '2023-11-27 15:24:26'),
(23, 'maïs (grains)', 2, '2023-11-27 15:24:26', '2023-11-27 15:24:26'),
(24, 'cubes de jambon', 2, '2023-11-27 15:24:26', '2023-11-27 15:24:26'),
(25, 'feta', 2, '2023-11-27 15:24:26', '2023-11-27 15:24:26'),
(26, 'betterave', 2, '2023-11-27 15:24:26', '2023-11-27 15:24:26'),
(27, 'echalote', 2, '2023-11-27 15:24:26', '2023-11-27 15:24:26'),
(28, 'oignon jeune', 2, '2023-11-27 15:24:26', '2023-11-27 15:24:26'),
(29, 'carotte râpée', 2, '2023-11-27 15:24:26', '2023-11-27 15:24:26'),
(30, 'oignon frit', 2, '2023-11-27 15:24:26', '2023-11-27 15:24:26'),
(31, 'oeufs de poisson', 2, '2023-11-27 15:24:26', '2023-11-27 15:24:26'),
(32, 'sauce teriyaki', 2, '2023-11-27 15:24:26', '2023-11-27 15:24:26'),
(33, 'sauce soja', 2, '2023-11-27 15:24:26', '2023-11-27 15:24:26'),
(34, 'huile', 2, '2023-11-27 15:24:26', '2023-11-27 15:24:26'),
(35, 'eau', 2, '2023-11-27 15:24:26', '2023-11-27 15:24:26');

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

--
-- Déchargement des données de la table `etapes`
--

INSERT INTO `etapes` (`EtapeID`, `RecetteID`, `Description`, `Position`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Description de l\'étape 3', 3, '2023-11-17 17:46:40', '2023-11-28 09:51:36'),
(2, 1, 'Description de l\'étape 2', 2, '2023-11-17 17:49:48', '2023-11-17 17:49:48'),
(3, 1, 'Description de l\'étape 3', 3, '2023-11-17 17:50:08', '2023-11-17 17:50:08'),
(4, 1, 'Couper les légumes', 4, '2023-11-17 18:14:41', '2023-11-17 18:14:41'),
(5, 1, 'Cuire les légumes', 5, '2023-11-17 18:14:41', '2023-11-17 18:14:41'),
(6, 2, 'Faire bouillir à feu moyen 500ml d’eau, baisser à feu très doux puis verser le riz et couvrir. Cuisson : 10 min.', 1, '2023-11-28 09:54:01', '2023-11-28 09:54:01'),
(7, 2, 'Couper en lamelles le steak et le faire revenir à la poêle dans de l’huile.', 2, '2023-11-28 09:54:01', '2023-11-28 09:54:01'),
(8, 2, 'Placer les edamame surgelés au micro-ondes à 800W durant 7 min.', 3, '2023-11-28 09:54:01', '2023-11-28 09:54:01'),
(9, 2, 'Sans enlever le couvercle, couper le feu du riz et laisser reposer 15 min.', 4, '2023-11-28 09:54:01', '2023-11-28 09:54:01'),
(10, 2, 'Emincer les échalotes et oignons jeunes.', 5, '2023-11-28 09:54:01', '2023-11-28 09:54:01'),
(11, 2, 'Râper la carotte.', 6, '2023-11-28 09:54:01', '2023-11-28 09:54:01'),
(12, 2, 'Ajouter au riz 4-5 cuillères à soupe de vinaigre de riz et une cuillère à café de sel, puis mélanger.', 7, '2023-11-28 09:54:01', '2023-11-28 09:54:01'),
(13, 2, 'Couper en morceaux le saumon cru, la feta et la betterave. Réserver.', 8, '2023-11-28 09:54:01', '2023-11-28 09:54:01'),
(14, 2, 'Répartir dans les bols en ajoutant le maïs et les cubes de jambon. Garnir d’oeufs de poisson, d’oignon frit et de sauce soja/teriyaki.', 9, '2023-11-28 09:54:01', '2023-11-28 09:54:01'),
(15, 2, 'Laisser les bols 15-20 min au frigo.', 10, '2023-11-28 09:54:01', '2023-11-28 09:54:01');

-- --------------------------------------------------------

--
-- Structure de la table `gardemangers`
--

CREATE TABLE `gardemangers` (
  `GardeMangerID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `AlimentID` int(11) NOT NULL,
  `Quantite` int(11) DEFAULT NULL,
  `Unite` enum('g','l','pcs','cs','cc','kg','ml','tasse','pincée') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `gardemangers`
--

INSERT INTO `gardemangers` (`GardeMangerID`, `UserID`, `AlimentID`, `Quantite`, `Unite`, `createdAt`, `updatedAt`) VALUES
(1, 2, 1, 6, 'pcs', '2023-11-10 14:42:34', '2023-11-24 02:55:32'),
(2, 2, 2, 6, 'pcs', '2023-11-10 14:47:54', '2023-11-10 14:47:54'),
(3, 2, 12, 5, 'kg', '2023-11-16 15:06:14', '2023-11-16 15:30:39'),
(5, 2, 1, 5, 'pcs', '2023-11-17 19:00:24', '2023-11-17 19:00:24'),
(6, 2, 2, 3, 'pcs', '2023-11-17 19:00:24', '2023-11-17 19:00:24'),
(7, 2, 4, 3, 'pcs', '2023-11-23 19:13:02', '2023-11-23 19:13:02'),
(8, 2, 9, 1, 'pcs', '2023-11-23 22:24:15', '2023-11-23 22:24:15'),
(9, 2, 6, 4, 'pcs', '2023-11-23 22:32:36', '2023-11-23 22:32:36'),
(10, 2, 5, 3, 'pcs', '2023-11-23 22:35:51', '2023-11-23 22:35:51'),
(11, 2, 7, 13, 'pcs', '2023-11-23 22:43:27', '2023-11-23 22:43:27'),
(12, 2, 8, 600, 'g', '2023-11-23 22:55:32', '2023-11-23 22:55:32'),
(13, 2, 11, 2, 'pcs', '2023-11-23 23:02:52', '2023-11-23 23:02:52'),
(15, 2, 15, 5, 'pcs', '2023-11-23 23:18:11', '2023-11-23 23:18:11'),
(16, 2, 12, 800, 'g', '2023-11-23 23:18:46', '2023-11-23 23:18:46'),
(17, 2, 12, 1200, 'g', '2023-11-23 23:58:57', '2023-11-23 23:58:57'),
(18, 2, 15, 8, 'pcs', '2023-11-24 00:07:54', '2023-11-24 02:42:17'),
(19, 2, 5, 450, 'pcs', '2023-11-24 00:08:50', '2023-11-24 14:44:38'),
(21, 2, 19, 1, 'kg', '2023-11-27 15:30:49', '2023-11-27 15:30:49'),
(22, 2, 20, 350, 'g', '2023-11-27 15:35:03', '2023-11-27 15:35:03'),
(23, 2, 21, 350, 'g', '2023-11-27 15:40:46', '2023-11-27 15:40:46'),
(24, 2, 22, 1, 'kg', '2023-11-27 15:40:59', '2023-11-27 15:40:59'),
(25, 2, 23, 5, 'pcs', '2023-11-27 15:41:15', '2023-11-27 15:41:15'),
(26, 2, 24, 400, 'g', '2023-11-27 15:41:24', '2023-11-27 15:41:24'),
(27, 2, 25, 120, 'g', '2023-11-27 15:41:34', '2023-11-27 15:41:34'),
(28, 2, 26, 2, 'pcs', '2023-11-27 15:41:43', '2023-11-27 15:41:43'),
(29, 2, 27, 16, 'pcs', '2023-11-27 15:41:55', '2023-11-27 15:41:55'),
(30, 2, 28, 9, 'pcs', '2023-11-27 15:42:22', '2023-11-27 15:42:22'),
(31, 2, 29, 400, 'g', '2023-11-27 15:42:33', '2023-11-27 15:42:33'),
(32, 2, 30, 750, 'g', '2023-11-27 15:42:41', '2023-11-27 15:42:41'),
(33, 2, 31, 300, 'g', '2023-11-27 15:42:50', '2023-11-27 15:42:50'),
(34, 2, 32, 450, 'ml', '2023-11-27 15:43:17', '2023-11-27 15:43:17'),
(35, 2, 33, 450, 'ml', '2023-11-27 15:43:27', '2023-11-27 15:43:27'),
(36, 2, 34, 1, 'l', '2023-11-27 15:45:13', '2023-11-27 15:45:13'),
(37, 2, 35, 2, 'l', '2023-11-27 15:46:02', '2023-11-27 15:46:02');

-- --------------------------------------------------------

--
-- Structure de la table `ingredientsrecettes`
--

CREATE TABLE `ingredientsrecettes` (
  `IngredientRecetteID` int(11) NOT NULL,
  `AlimentID` int(11) DEFAULT NULL,
  `RecetteID` int(11) DEFAULT NULL,
  `Quantite` int(11) DEFAULT NULL,
  `Unite` enum('g','l','pcs','cs','cc','kg','ml','tasse','pincée') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ingredientsrecettes`
--

INSERT INTO `ingredientsrecettes` (`IngredientRecetteID`, `AlimentID`, `RecetteID`, `Quantite`, `Unite`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 100, 'pcs', '2023-11-17 15:53:55', '2023-11-17 15:53:55'),
(2, 2, 1, 150, 'pcs', '2023-11-17 17:50:53', '2023-11-17 17:50:53'),
(3, 6, 1, 450, 'g', '2023-11-17 17:51:08', '2023-11-17 17:51:08'),
(4, 5, 1, 100, 'g', '2023-11-17 18:02:46', '2023-11-17 18:02:46'),
(5, 8, 1, 200, 'g', '2023-11-17 18:02:46', '2023-11-17 18:02:46'),
(6, 19, 2, 250, 'g', '2023-11-27 15:53:25', '2023-11-27 15:53:25'),
(7, 20, 2, 150, 'g', '2023-11-27 15:53:25', '2023-11-27 15:53:25'),
(8, 21, 2, 150, 'g', '2023-11-27 15:54:34', '2023-11-27 15:54:34'),
(9, 22, 2, 150, 'g', '2023-11-27 15:54:34', '2023-11-27 15:54:34'),
(10, 23, 2, 140, 'g', '2023-11-27 15:59:33', '2023-11-27 15:59:33'),
(11, 24, 2, 50, 'g', '2023-11-27 15:59:33', '2023-11-27 15:59:33'),
(12, 25, 2, 50, 'g', '2023-11-27 15:59:33', '2023-11-27 15:59:33'),
(13, 26, 2, 50, 'g', '2023-11-27 15:59:33', '2023-11-27 15:59:33'),
(14, 27, 2, 2, 'pcs', '2023-11-27 16:01:45', '2023-11-27 16:01:45'),
(15, 28, 2, 50, 'g', '2023-11-27 16:01:45', '2023-11-27 16:01:45'),
(16, 29, 2, 2, 'pcs', '2023-11-27 16:01:45', '2023-11-27 16:01:45'),
(17, 30, 2, 1, 'pcs', '2023-11-27 16:01:45', '2023-11-27 16:01:45'),
(18, 31, 2, 5, 'cs', '2023-11-27 16:01:45', '2023-11-27 16:01:45'),
(19, 32, 2, 2, 'cs', '2023-11-27 16:01:45', '2023-11-27 16:01:45'),
(20, 33, 2, 3, 'cs', '2023-11-27 16:01:45', '2023-11-27 16:01:45'),
(21, 34, 2, 2, 'cs', '2023-11-27 16:03:12', '2023-11-27 16:03:12'),
(22, 35, 2, 700, 'ml', '2023-11-27 16:03:12', '2023-11-27 16:03:12');

-- --------------------------------------------------------

--
-- Structure de la table `recettes`
--

CREATE TABLE `recettes` (
  `RecetteID` int(11) NOT NULL,
  `Nom` varchar(50) NOT NULL,
  `UserID` int(11) NOT NULL,
  `TempsDePreparation` int(11) DEFAULT NULL,
  `TempsDeCuisson` int(11) DEFAULT NULL,
  `NiveauDeDifficulte` enum('facile','moyen','difficile','expert') NOT NULL,
  `NombreDePersonnes` int(11) DEFAULT NULL,
  `CaloriesParPersonne` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `recettes`
--

INSERT INTO `recettes` (`RecetteID`, `Nom`, `UserID`, `TempsDePreparation`, `TempsDeCuisson`, `NiveauDeDifficulte`, `NombreDePersonnes`, `CaloriesParPersonne`, `createdAt`, `updatedAt`) VALUES
(1, 'Nom de la recette', 2, 30, 45, 'moyen', 4, 500, '2023-11-17 14:48:45', '2023-11-17 14:48:45'),
(2, 'Poké bowl', 2, 90, 15, 'moyen', 2, 500, '2023-11-27 15:49:37', '2023-11-27 15:49:37');

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
  `Pseudo` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `MotDePasse` varchar(255) NOT NULL,
  `RoleID` int(11) DEFAULT 3,
  `ResetPasswordToken` varchar(255) DEFAULT NULL,
  `ResetPasswordExpires` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`UserID`, `Pseudo`, `Email`, `MotDePasse`, `RoleID`, `ResetPasswordToken`, `ResetPasswordExpires`, `createdAt`, `updatedAt`) VALUES
(2, 'nouvelUtilisateur', 'email@exemple.com', '$2a$10$7Hdg/.7govMYtlu2oosvh.9ecCIKXYVCIuAF1ugr4NZfQPihcuaBO', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjk5MjYzMzM4LCJleHAiOjE2OTkyNjY5Mzh9.t2TLUz4eYmKYXthNln_9LPmApoacAOuogSMoFB3OV0A', '2023-11-06 10:35:38', '2023-11-03 11:00:03', '2023-11-06 09:35:38'),
(3, 'ingredio', 'ingredio.noreply@francois-szczepkowski.be', '$2a$10$xrkWje5McavaDMYdHYpZKemWEklDDZGw3OK6lI1THUSgqd.AvefS2', 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjk5MjY0MDE2LCJleHAiOjE2OTkyNjc2MTZ9.XiCMi4xRtIo9zzgjdX6hMAX43dm8STiofTOMPmQiofQ', '2023-11-06 10:46:56', '2023-11-06 09:46:08', '2023-11-06 09:46:56'),
(4, 'Sadicoman', 'francois.szcz@hotmail.fr', '$2a$10$64ZKMCEEWrr1YvqvqMIPC.k4BJvSDqCUWL/FFWNFTMSdZNMMNp4o6', 3, NULL, NULL, '2023-11-18 00:19:23', '2023-11-18 00:19:23'),
(5, 'Sg1', 'fakirano14pro@gmail.com', '$2a$10$HPODoe.G0dqNHBcBcu7d6uEuAHJpAzkqLbutR8rdX/1I7ZkTrTXCu', 3, NULL, NULL, '2023-11-22 18:15:55', '2023-11-22 18:15:55');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `aliments`
--
ALTER TABLE `aliments`
  ADD PRIMARY KEY (`AlimentID`),
  ADD UNIQUE KEY `Nom` (`Nom`),
  ADD KEY `UserID` (`UserID`);

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
  MODIFY `AlimentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT pour la table `etapes`
--
ALTER TABLE `etapes`
  MODIFY `EtapeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `gardemangers`
--
ALTER TABLE `gardemangers`
  MODIFY `GardeMangerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT pour la table `ingredientsrecettes`
--
ALTER TABLE `ingredientsrecettes`
  MODIFY `IngredientRecetteID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `recettes`
--
ALTER TABLE `recettes`
  MODIFY `RecetteID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `RoleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `aliments`
--
ALTER TABLE `aliments`
  ADD CONSTRAINT `aliments_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

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
