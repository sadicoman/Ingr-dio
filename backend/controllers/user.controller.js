const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.registerUser = async (req, res) => {
    try {
        const { Pseudo, Email, MotDePasse } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const userExists = await User.findOne({ where: { Email } });
        if (userExists) {
            return res
                .status(400)
                .json({ message: "Un utilisateur avec cet email existe déjà." });
        }

        // Création de l'utilisateur
        const newUser = await User.create({ Pseudo, Email, MotDePasse });

        // Générer un token JWT
        const token = jwt.sign({ id: newUser.UserID }, process.env.JWT_SECRET, {
            expiresIn: 86400, // 24 heures
        });

        res.status(201).send({ auth: true, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { login, MotDePasse } = req.body; // login peut être soit l'email, soit le pseudo

        // Trouvez l'utilisateur par email ou pseudo
        const user = await User.findOne({
            where: {
                [Op.or]: [{ Email: login }, { Pseudo: login }],
            },
        });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Vérifiez le mot de passe
        const passwordIsValid = bcrypt.compareSync(MotDePasse, user.MotDePasse);
        if (!passwordIsValid) {
            return res.status(401).json({
                auth: false,
                token: null,
                message: "Mot de passe invalide.",
            });
        }

        // Si le mot de passe est correct, générez un token
        const token = jwt.sign({ id: user.UserID }, process.env.JWT_SECRET, {
            expiresIn: 86400, // expire en 24 heures
        });

        // Répondez avec un token
        res.status(200).json({ auth: true, token });
    } catch (error) {
        res.status(500).json({ message: "Il y a eu un problème à se connecter." });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.userId);
        if (!user) return res.status(404).send({ message: "Utilisateur non trouvé." });

        // Sélectionner les informations spécifiques à renvoyer
        const userProfile = {
            pseudo: user.Pseudo,
            email: user.Email,
            role: user.RoleID,
        };

        res.status(200).send(userProfile);
    } catch (error) {
        res.status(500).send({
            message: "Erreur lors de la récupération du profil de l'utilisateur.",
        });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const { Pseudo, Email } = req.body;
        const user = await User.findByPk(req.userId);
        if (!user) return res.status(404).send({ message: "Utilisateur non trouvé." });

        user.Pseudo = Pseudo || user.Pseudo;
        user.Email = Email || user.Email;

        await user.save();
        res.status(200).send({ message: "Profil mis à jour avec succès." });
    } catch (error) {
        res.status(500).send({
            message: "Erreur lors de la mise à jour du profil de l'utilisateur.",
        });
    }
};
