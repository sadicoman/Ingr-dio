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
                    <option value="gramme">Gramme</option>
                    <option value="litre">Litre</option>
                    <option value="piece">Pièce</option>
                    <option value="cuillere a soupe">Cuillère à soupe</option>
                    <option value="cuillere a cafe">Cuillère à café</option>
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

export default FormModificationAliment;
