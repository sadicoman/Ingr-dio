import PropTypes from "prop-types";

const ItemAliment = ({ aliment, onSupprimer, onModifier }) => {
    // Vérifiez que l'objet aliment et la propriété Nom imbriquée existent
    if (!aliment || !aliment.aliment || !aliment.aliment.Nom) {
        return <div>Chargement...</div>;
    }

    return (
        <li>
            {aliment.aliment.Nom} - Quantité : {aliment.Quantite} {aliment.Unite}
            <button onClick={() => onModifier(aliment)}>Modifier</button>
            <button onClick={() => onSupprimer(aliment.GardeMangerID)}>Supprimer</button>
        </li>
    );
};

// Définition des PropTypes pour ItemAliment
ItemAliment.propTypes = {
    // `aliment` est un objet avec des propriétés spécifiques
    aliment: PropTypes.shape({
        GardeMangerID: PropTypes.number.isRequired,
        Quantite: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        Unite: PropTypes.string.isRequired,
        aliment: PropTypes.shape({
            Nom: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    // `onSupprimer` et `onModifier` sont des fonctions
    onSupprimer: PropTypes.func.isRequired,
    onModifier: PropTypes.func.isRequired,
};

export default ItemAliment;
