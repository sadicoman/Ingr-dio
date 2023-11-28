import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    recetteService,
    ingredientsRecetteService,
    etapesService,
} from "../../../services/recette.service";

const RecetteDetails = () => {
    const [recette, setRecette] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [etapes, setEtapes] = useState([]);
    const { id } = useParams();

    // console.log("test");
    useEffect(() => {
        const chargerRecette = async () => {
            try {
                // const response = await recetteService.obtenirRecetteParId(id);
                // console.log(response);
                // response ? setRecette(response.data) : null;
                const responseRecette = await recetteService.obtenirRecetteParId(id);
                if (responseRecette) {
                    setRecette(responseRecette.data);
                }

                const responseIngredients =
                    await ingredientsRecetteService.obtenirIngredientsParRecette(id);
                if (responseIngredients) {
                    setIngredients(responseIngredients.data);
                }

                const responseEtapes = await etapesService.obtenirEtapesParRecette(id);
                if (responseEtapes) setEtapes(responseEtapes.data);
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
        <>
            <Link to={`/recettes`}>Retour</Link>
            <section>
                <h1>Recette details</h1>
                <h2>{recette.Nom}</h2>
                <p>Temps De Preparation : {recette.TempsDePreparation}</p>
                <p>Temps De Cuisson : {recette.TempsDeCuisson}</p>
                <p>Niveau De Difficulte : {recette.NiveauDeDifficulte}</p>
                <p>Nombre De Personnes : {recette.NombreDePersonnes}</p>
            </section>
            <section>
                <h2>Etapes de la recettes :</h2>
                <ol>
                    {etapes.map((etape, index) => (
                        <li key={etape.EtapeID}>
                            Étape {index + 1}: {etape.Description}
                        </li>
                    ))}
                </ol>
            </section>
            <section>
                <h2>Ingrédient : </h2>
                <ul>
                    {ingredients.map((ingredient) => (
                        <li key={ingredient.IngredientRecetteID}>
                            {ingredient.aliment.Nom} - Quantité: {ingredient.Quantite}{" "}
                            {ingredient.Unite}
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
};

export default RecetteDetails;
