import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { recetteService } from "../../../services/recette.service";

const RecetteDetails = () => {
    const [recette, setRecette] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const chargerRecette = async () => {
            try {
                const response = await recetteService.obtenirRecetteParId(id);
                setRecette(response.data);
            } catch (error) {
                console.error("Erreur lors du chargement de la recette", error);
            }
        };

        chargerRecette();
    }, [id]);

    if (!recette) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <h1>Recette details</h1>
            <h2>{recette.Nom}</h2>
        </div>
    );
};

export default RecetteDetails;
