// passwordValidator.js

module.exports = (req, res, next) => {
    const { MotDePasse } = req.body;
    let erreurs = [];

    // Vérification de la longueur
    if (MotDePasse.length < 12) {
        erreurs.push("Le mot de passe doit contenir au moins 12 caractères.");
    }

    // Vérification de la présence d'une lettre majuscule
    if (!/[A-Z]/.test(MotDePasse)) {
        erreurs.push("Le mot de passe doit contenir au moins une lettre majuscule.");
    }

    // Vérification de la présence d'un chiffre
    if (!/[0-9]/.test(MotDePasse)) {
        erreurs.push("Le mot de passe doit contenir au moins un chiffre.");
    }

    // Vérification de la présence d'un caractère spécial
    if (!/[!@#$%^&*]/.test(MotDePasse)) {
        erreurs.push(
            "Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*).",
        );
    }

    // S'il y a des erreurs, renvoyez-les toutes en une fois
    if (erreurs.length > 0) {
        return res.status(400).json({
            message: "Validation du mot de passe échouée.",
            erreurs: erreurs,
        });
    }

    next(); // Si toutes les conditions sont remplies, passez au middleware suivant ou à la fonction de route
};
