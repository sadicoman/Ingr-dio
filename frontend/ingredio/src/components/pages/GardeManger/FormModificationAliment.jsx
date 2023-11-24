import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const FormModificationAliment = ({ aliment, onModifier, onAnnuler }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Réinitialiser les données du formulaire chaque fois que l'aliment change
    useEffect(() => {
        reset({
            Quantite: aliment.Quantite,
            Unite: aliment.Unite,
        });
    }, [aliment, reset]);

    // Gérer la soumission du formulaire
    const onSubmit = (data) => {
        // Préparer les données à envoyer, y compris AlimentID
        const updateData = {
            ...data,
            AlimentID: aliment.AlimentID, // Ajouter AlimentID aux données
        };

        // Appel de la fonction onModifier avec GardeMangerID et les nouvelles données
        onModifier(aliment.GardeMangerID, updateData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="quantite">Quantité:</label>
                <input id="quantite" {...register("Quantite", { required: true })} />
                {errors.quantite && <span>Ce champ est requis</span>}
            </div>
            <div>
                <label htmlFor="unite">Unité:</label>
                <select id="unite" {...register("unite", { required: true })}>
                    <option value="g">g - Gramme</option>
                    <option value="l">l - Litre</option>
                    <option value="pcs">pcs - Pièce</option>
                    <option value="cs">cs - Cuillère à soupe</option>
                    <option value="cc">cc - Cuillère à café</option>
                    <option value="kg">kg - Kilogramme</option>
                    <option value="ml">ml - Millilitre</option>
                    <option value="tasse">tasse - Tasse</option>
                    <option value="pincée">pincée - Pincée</option>
                </select>

                {errors.unite && <span>Ce champ est requis</span>}
            </div>
            <button type="submit">Sauvegarder</button>
            <button type="button" onClick={onAnnuler}>
                Annuler
            </button>
        </form>
    );
};

// Définition des PropTypes pour FormModificationAliment
FormModificationAliment.propTypes = {
    // `aliment` est un objet avec des propriétés spécifiques
    aliment: PropTypes.shape({
        GardeMangerID: PropTypes.number.isRequired,
        AlimentID: PropTypes.number.isRequired,
        Quantite: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        Unite: PropTypes.string.isRequired,
    }).isRequired,
    // `onModifier` et `onAnnuler` sont des fonctions
    onModifier: PropTypes.func.isRequired,
    onAnnuler: PropTypes.func.isRequired,
};

export default FormModificationAliment;
