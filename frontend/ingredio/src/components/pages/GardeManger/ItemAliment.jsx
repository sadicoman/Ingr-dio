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

export default ItemAliment;
