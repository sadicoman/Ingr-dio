const emailValidator = (req, res, next) => {
    const { Email } = req.body;

    // Expression régulière pour valider l'email
    const regexEmail =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Vérifiez si l'email est valide
    if (!regexEmail.test(Email)) {
        return res.status(400).json({
            message: "Format d'email invalide.",
        });
    }

    next();
};

module.exports = emailValidator;
