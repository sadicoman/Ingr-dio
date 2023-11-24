import { useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

const FormModificationAliment = ({ alimentAModifier, onSubmit }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        reset({ Nom: alimentAModifier.Nom });
    }, [alimentAModifier, reset]);

    const handleFormSubmit = (data) => {
        onSubmit(alimentAModifier.AlimentID, data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
                <label htmlFor="nom">Nom:</label>
                <input
                    id="nom"
                    {...register("Nom", { required: true })}
                    defaultValue={alimentAModifier.Nom}
                />
                {errors.Nom && <span>Ce champ est requis</span>}
            </div>
            <button type="submit">Modifier</button>
        </form>
    );
};

FormModificationAliment.propTypes = {
    alimentAModifier: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default FormModificationAliment;
