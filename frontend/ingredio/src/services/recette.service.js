import axios from "axios";

const API_URL = "http://localhost:8000";

const getAuthConfig = () => {
	const token = localStorage.getItem("userToken");
	return {
		headers: { Authorization: token },
	};
};

// const token = localStorage.getItem("userToken");

// const config = {
// 	headers: { Authorization: `${token}` },
// };

export const recetteService = {
	creerRecette: data => axios.post(`${API_URL}/recettes/ajouter`, data, getAuthConfig()),
	obtenirToutesRecettes: () => axios.get(`${API_URL}/recettes`, getAuthConfig()),
	obtenirRecetteParId: id => axios.get(`${API_URL}/recettes/${id}`, getAuthConfig()),
	mettreAJourRecette: (id, data) =>
		axios.put(`${API_URL}/recettes/${id}`, data, getAuthConfig()),
	supprimerRecette: id => axios.delete(`${API_URL}/recettes/${id}`, getAuthConfig()),
	obtenirSuggestionsRecettes: alimentsGardeManger =>
		axios.post(
			`${API_URL}/recettes/suggestions`,
			{ aliments: alimentsGardeManger },
			config,
		),
	getLatestRecipes: limit =>
		axios.get(`${API_URL}/recettes?limit=${limit}`, getAuthConfig()),
};

export const ingredientsRecetteService = {
	ajouterIngredient: data =>
		axios.post(`${API_URL}/ingredientsRecettes/ajouter`, data, getAuthConfig()),
	obtenirIngredientsParRecette: recetteId =>
		axios.get(`${API_URL}/ingredientsRecettes/recette/${recetteId}`, getAuthConfig()),
	mettreAJourIngredient: (id, data) =>
		axios.put(`${API_URL}/ingredientsRecettes/${id}`, data, getAuthConfig()),
	supprimerIngredient: id =>
		axios.delete(`${API_URL}/ingredientsRecettes/${id}`, getAuthConfig()),
	ajouterPlusieursIngredients: data =>
		axios.post(`${API_URL}/ingredientsRecettes/ajouter-multiples`, data, getAuthConfig()),
};

export const etapesService = {
	ajouterEtape: data => axios.post(`${API_URL}/etapes/ajouter`, data, getAuthConfig()),
	obtenirEtapesParRecette: recetteId =>
		axios.get(`${API_URL}/etapes/recette/${recetteId}`, getAuthConfig()),
	mettreAJourEtape: (id, data) =>
		axios.put(`${API_URL}/etapes/${id}`, data, getAuthConfig()),
	supprimerEtape: id => axios.delete(`${API_URL}/etapes/${id}`, getAuthConfig()),
	ajouterPlusieursEtapes: data =>
		axios.post(`${API_URL}/etapes/ajouter-multiples`, data, getAuthConfig()),
};
