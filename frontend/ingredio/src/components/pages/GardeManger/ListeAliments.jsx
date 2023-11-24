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

export default ListeAliments;
