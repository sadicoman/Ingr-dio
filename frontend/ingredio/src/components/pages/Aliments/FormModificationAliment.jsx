import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

const FormModificationAliment = ({ alimentAModifier, onSubmit }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const labelRef = useRef(null);
    const cutRef = useRef(null);

    useEffect(() => {
        if (labelRef.current && cutRef.current) {
            const labelWidth1 = labelRef.current.offsetWidth;
            cutRef.current.style.width = `${labelWidth1}px`;
        }
        reset({ Nom: alimentAModifier.Nom });
    }, [alimentAModifier, reset]);

    const handleFormSubmit = (data) => {
        onSubmit(alimentAModifier.AlimentID, data);
    };

    return (
        <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="input-container ic1">
                <input
                    className="input"
                    id="nom"
                    {...register("Nom", { required: true })}
                    defaultValue={alimentAModifier.Nom}
                />
                <div className="cut cut--actif" ref={cutRef}></div>
                <label className="iLabel iLabel--actif" htmlFor="nom">
                    Nom:
                </label>
                {errors.Nom && <span>Ce champ est requis</span>}
            </div>
            <button className="submit" type="submit">
                Modifier
            </button>
        </form>
    );
};

FormModificationAliment.propTypes = {
    alimentAModifier: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default FormModificationAliment;
