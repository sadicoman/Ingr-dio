import PropTypes from "prop-types";
import ItemAliment from "./ItemAliment";

const ListeAliments = ({ aliments, onSupprimer, onModifier }) => {
    return (
        <ul>
            {aliments.map((aliment) => (
                <ItemAliment
                    key={aliment.GardeMangerID}
                    aliment={aliment}
                    onSupprimer={onSupprimer}
                    onModifier={() => onModifier(aliment)}
                />
            ))}
        </ul>
    );
};

ListeAliments.propTypes = {
    // `aliments` est un tableau d'objets avec une structure spécifique
    aliments: PropTypes.arrayOf(
        PropTypes.shape({
            GardeMangerID: PropTypes.number.isRequired,
            // Vous pouvez ajouter d'autres propriétés attendues de l'objet `aliment` ici
        }),
    ).isRequired,
    // `onSupprimer` et `onModifier` sont des fonctions
    onSupprimer: PropTypes.func.isRequired,
    onModifier: PropTypes.func.isRequired,
};

export default ListeAliments;
