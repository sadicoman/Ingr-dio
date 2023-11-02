// middleware d'authentification. 
exports.isAuthenticated = (req, res, next) => {
    // Vérifiez si l'utilisateur est authentifié. Si oui, continuez. Sinon, renvoyez une erreur.
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).json({ message: 'Non autorisé' });
    }
};
