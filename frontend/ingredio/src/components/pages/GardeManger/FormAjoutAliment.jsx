import { useForm } from "react-hook-form";

const FormAjoutAliment = ({ onAjout }) => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        onAjout(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register("nomAliment")}
                type="text"
                placeholder="Nom de l'aliment"
            />
            <input {...register("Quantite")} type="number" placeholder="Quantité" />
            <select {...register("Unite")}>
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
            <button type="submit">Ajouter Aliment</button>
        </form>
    );
};

export default FormAjoutAliment;
