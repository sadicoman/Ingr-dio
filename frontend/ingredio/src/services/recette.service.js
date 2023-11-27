import axios from "axios";

const API_URL = "http://localhost:8000";
const token = localStorage.getItem("userToken");

const config = {
    headers: { Authorization: `${token}` },
};

export const recetteService = {
    creerRecette: (data) => axios.post(`${API_URL}/recettes/ajouter`, data, config),
    obtenirToutesRecettes: () => axios.get(`${API_URL}/recettes`, config),
    obtenirRecetteParId: (id) => axios.get(`${API_URL}/recettes/${id}`, config),
    mettreAJourRecette: (id, data) =>
        axios.put(`${API_URL}/recettes/${id}`, data, config),
    supprimerRecette: (id) => axios.delete(`${API_URL}/recettes/${id}`, config),
};

export const ingredientsRecetteService = {
    ajouterIngredient: (data) =>
        axios.post(`${API_URL}/ingredientsRecettes/ajouter`, data, config),
    obtenirIngredientsParRecette: (recetteId) =>
        axios.get(`${API_URL}/ingredientsRecettes/recette/${recetteId}`, config),
    mettreAJourIngredient: (id, data) =>
        axios.put(`${API_URL}/ingredientsRecettes/${id}`, data, config),
    supprimerIngredient: (id) =>
        axios.delete(`${API_URL}/ingredientsRecettes/${id}`, config),
    ajouterPlusieursIngredients: (data) =>
        axios.post(`${API_URL}/ingredientsRecettes/ajouter-multiples`, data, config),
};

export const etapesService = {
    ajouterEtape: (data) => axios.post(`${API_URL}/etapes/ajouter`, data, config),
    obtenirEtapesParRecette: (recetteId) =>
        axios.get(`${API_URL}/etapes/recette/${recetteId}`, config),
    mettreAJourEtape: (id, data) => axios.put(`${API_URL}/etapes/${id}`, data, config),
    supprimerEtape: (id) => axios.delete(`${API_URL}/etapes/${id}`, config),
    ajouterPlusieursEtapes: (data) =>
        axios.post(`${API_URL}/etapes/ajouter-multiples`, data, config),
};
