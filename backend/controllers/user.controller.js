const User = require("../models/User");
const jwt = require("jsonwebtoken");

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
