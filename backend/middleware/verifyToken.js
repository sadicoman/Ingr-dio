require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) return res.status(403).send({ message: "Aucun token fourni." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).send({ message: "Non autorisé." });
    }
};
