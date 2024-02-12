import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
// import "../../formulaire/formulaire.scss";

const FormAjoutAliment = ({ onAjout }) => {
    const { register, handleSubmit, setValue, reset } = useForm();
    const [quantite, setQuantite] = useState(0);
    const [nomAlimentActive, setNomAlimentActive] = useState(false);

    // Création de références distinctes pour chaque label et cut
    const labelRef1 = useRef(null);
    const cutRef1 = useRef(null);
    const labelRef2 = useRef(null);
    const cutRef2 = useRef(null);

    useEffect(() => {
        // Mise à jour de la largeur pour le premier label et cut
        if (labelRef1.current && cutRef1.current) {
            const labelWidth1 = labelRef1.current.offsetWidth;
            cutRef1.current.style.width = `${labelWidth1}px`;
        }

        // Mise à jour de la largeur pour le deuxième label et cut
        if (labelRef2.current && cutRef2.current) {
            const labelWidth2 = labelRef2.current.offsetWidth;
            cutRef2.current.style.width = `${labelWidth2}px`;
        }

        // Mise à jour de la valeur de quantité dans useForm
        setValue("Quantite", quantite);
    }, [quantite, setValue]);

    const augmenterQuantite = () => setQuantite((q) => q + 1);
    const diminuerQuantite = () => setQuantite((q) => Math.max(q - 1, 0));

    const onSubmit = (data) => {
        onAjout(data);
        reset();
    };

    // Fonction pour vérifier si la quantité est non-nulle
    const isQuantiteActive = quantite >= 0;

    useEffect(() => {
        // Pour nomAliment
        setNomAlimentActive(document.getElementById("nomAliment").value !== "");
    }, [register]);

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="title title--niveau2">Ajouter un nouveau aliment</h2>
            <div className="input-container ic1">
                <input
                    className="input"
                    id="nomAliment"
                    {...register("nomAliment")}
                    type="text"
                    onChange={(e) => setNomAlimentActive(e.target.value !== "")}
                    // placeholder="Nom de l'aliment"
                />
                <div
                    className={`cut ${nomAlimentActive ? "cut--actif" : ""}`}
                    ref={cutRef1}
                ></div>
                <label
                    className={`iLabel ${nomAlimentActive ? "iLabel--actif" : ""}`}
                    ref={labelRef1}
                >
                    Nom de l'aliment
                </label>
            </div>
            <div className="input-container ic2">
                <div
                    className={`containner__quantite ${
                        isQuantiteActive ? "containner__quantite--actif" : ""
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
                        {...register("Quantite")}
                        type="number"
                        // placeholder="Quantité"
                    />
                    <button
                        className="btn--plus"
                        type="button"
                        onClick={augmenterQuantite}
                    >
                        +
                    </button>
                    <div className="cut" ref={cutRef2}></div>
                    <label className="iLabel ilabel--quantite" ref={labelRef2}>
                        Quantité
                    </label>
                </div>
            </div>
            <div className="input-container ic2">
                <select className="input" {...register("Unite")}>
                    <option className="option" value="g">
                        g - Gramme
                    </option>
                    <option className="option" value="l">
                        l - Litre
                    </option>
                    <option className="option" value="pcs">
                        pcs - Pièce
                    </option>
                    <option className="option" value="cs">
                        cs - Cuillère à soupe
                    </option>
                    <option className="option" value="cc">
                        cc - Cuillère à café
                    </option>
                    <option className="option" value="kg">
                        kg - Kilogramme
                    </option>
                    <option className="option" value="ml">
                        ml - Millilitre
                    </option>
                    <option className="option" value="tasse">
                        tasse - Tasse
                    </option>
                    <option className="option" value="pincée">
                        pincée - Pincée
                    </option>
                </select>
            </div>
            <button className="submit" type="submit">
                Ajouter Aliment
            </button>
        </form>
    );
};

export default FormAjoutAliment;
