exports.getAll = (req, res) => {
    // Récupérer tous les ingredientsRecettes de la base de données
    // Et renvoyer une réponse
    res.status(200).json({ message: "Liste de tous les ingredientsRecettes" });
};

exports.getById = (req, res) => {
    // Récupérer un ingredientsRecette spécifique en utilisant req.params.id
    // Et renvoyer une réponse
    res.status(200).json({ message: `ingredientsRecette avec l'id ${req.params.id}` });
};

exports.create = (req, res) => {
    // Créer un nouveau ingredientsRecette avec les informations de req.body
    // Et renvoyer une réponse
    res.status(201).json({ message: "ingredientsRecette créé" });
};

exports.update = (req, res) => {
    // Mettre à jour un ingredientsRecette spécifique en utilisant req.params.id
    // Et renvoyer une réponse
    res.status(200).json({
        message: `ingredientsRecette avec l'id ${req.params.id} mis à jour`,
    });
};

exports.delete = (req, res) => {
    // Supprimer un ingredientsRecette spécifique en utilisant req.params.id
    // Et renvoyer une réponse
    res.status(200).json({
        message: `ingredientsRecette avec l'id ${req.params.id} supprimé`,
    });
};
