import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
// import "../../formulaire/formulaire.scss";

const FormModificationAliment = ({ aliment, onModifier, onAnnuler, onCancel }) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();
    const [quantite, setQuantite] = useState(aliment.Quantite || 0);

    useEffect(() => {
        reset({
            Quantite: quantite,
            Unite: aliment.Unite,
        });
    }, [aliment, reset, quantite]);

    const augmenterQuantite = () => {
        const nouvelleQuantite = quantite + 1;
        setQuantite(nouvelleQuantite);
        setValue("Quantite", nouvelleQuantite); // Mettre à jour le champ dans useForm
    };

    const diminuerQuantite = () => {
        const nouvelleQuantite = Math.max(quantite - 1, 0);
        setQuantite(nouvelleQuantite);
        setValue("Quantite", nouvelleQuantite); // Mettre à jour le champ dans useForm
    };

    const onSubmit = (data) => {
        const updateData = {
            ...data,
            AlimentID: aliment.AlimentID,
        };
        onModifier(aliment.GardeMangerID, updateData);
    };

    return (
        <div className="form-container form-container--gardeManger">
            <form className="form form--modifier" onSubmit={handleSubmit(onSubmit)}>
                <button className="form-close-btn" onClick={onCancel}>
                    &times;
                </button>
                <div className="input-container ic2">
                    <div
                        className={`containner__quantite ${
                            quantite > 0 ? "containner__quantite--actif" : ""
                        }`}
                    >
                        <button
                            className="btn--moin"
                            type="button"
                            onClick={diminuerQuantite}
                        >
                            -
                        </button>
                        <input
                            className="input input--quantite"
                            id="quantite"
                            {...register("Quantite", { required: true })}
                            type="number"
                            value={quantite} // Lier l'état à l'input
                            onChange={(e) => {
                                const val = parseInt(e.target.value) || 0;
                                setQuantite(val);
                                setValue("Quantite", val); // Mettre à jour le champ dans useForm
                            }}
                        />
                        <button
                            className="btn--plus"
                            type="button"
                            onClick={augmenterQuantite}
                        >
                            +
                        </button>
                        <div className="cut"></div>
                        <label className="iLabel ilabel--quantite">Quantité:</label>
                        {errors.quantite && <span>Ce champ est requis</span>}
                    </div>
                </div>
                <div className="input-container ic2">
                    <select
                        className="input"
                        id="unite"
                        {...register("unite", { required: true })}
                    >
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
                <button className="submit" type="submit">
                    Sauvegarder
                </button>
                <button
                    className="submit submit--annuler"
                    type="button"
                    onClick={onAnnuler}
                >
                    Annuler
                </button>
            </form>
        </div>
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
