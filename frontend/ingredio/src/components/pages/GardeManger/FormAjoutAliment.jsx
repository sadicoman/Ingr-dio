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
                <option value="gramme">Gramme</option>
                <option value="litre">Litre</option>
                <option value="piece">Pièce</option>
                <option value="cuillere a soupe">Cuillère à soupe</option>
                <option value="cuillere a cafe">Cuillère à café</option>
            </select>
            <button type="submit">Ajouter Aliment</button>
        </form>
    );
};

export default FormAjoutAliment;
