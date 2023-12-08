import PropTypes from "prop-types";
import IconeSupprimer from "./iconeSupprimer";
import IconModifier from "./IconeModifier";
import "../../btn/btn.scss";

const ItemAliment = ({ aliment, onSupprimer, onModifier }) => {
    // Vérifiez que l'objet aliment et la propriété Nom imbriquée existent
    if (!aliment || !aliment.aliment || !aliment.aliment.Nom) {
        return <div>Chargement...</div>;
    }

    return (
        <li className="aliment__card">
            {aliment.aliment.Nom} - Quantité : {aliment.Quantite} {aliment.Unite}
            <button className="btn btn--modifier" onClick={() => onModifier(aliment)}>
                <span className="button__text">Modifier</span>
                <span className="button__icon">
                    <IconModifier />
                </span>
            </button>
            <button
                className="btn btn--supprimer"
                onClick={() => onSupprimer(aliment.GardeMangerID)}
            >
                <span className="button__text">Supprimer</span>
                <span className="button__icon">
                    <IconeSupprimer />
                </span>
            </button>
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
