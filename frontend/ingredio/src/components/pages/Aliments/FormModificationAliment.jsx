import "./FormModificationAliment.scss";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

const FormModificationAliment = ({ alimentAModifier, onSubmit, onCancel }) => {
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
        <div className="form-container form-container--aliments">
            <form
                className="form form--aliments"
                onSubmit={handleSubmit(handleFormSubmit)}
            >
                <button className="form-close-btn" onClick={onCancel}>
                    &times;
                </button>
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
        </div>
    );
};

FormModificationAliment.propTypes = {
    alimentAModifier: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired, // Ajoutez cette ligne pour la validation de la prop onCancel
};

export default FormModificationAliment;
