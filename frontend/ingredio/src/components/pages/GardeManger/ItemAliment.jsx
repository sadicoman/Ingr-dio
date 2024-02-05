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
        <li className="aliments__el aliment__card">
            <h4 className="title title--niveau5 aliment__nom">{aliment.aliment.Nom}</h4>
            <img
                className="aliments__img"
                src={
                    aliment.aliment.ImageUrl
                        ? `http://localhost:8000${aliment.aliment.ImageUrl}`
                        : "src/assets/images/aliments.webp"
                }
                alt={aliment.aliment.Nom}
            />
            <p>
                Quantité : {aliment.Quantite} {aliment.Unite}
            </p>
            <div className="aliment__btn">
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
            </div>
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
