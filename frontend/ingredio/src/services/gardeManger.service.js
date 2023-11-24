import axios from "axios";

const API_URL = "http://localhost:8000/gardeMangers";

// Obtenir tous les aliments du garde-manger de l'utilisateur
export const obtenirContenuGardeManger = async () => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `${localStorage.getItem("userToken")}`,
        },
    });
    return response.data;
};

// Ajouter un nouvel aliment au garde-manger
export const ajouterAlimentGardeManger = async (alimentData) => {
    const response = await axios.post(`${API_URL}/ajouter`, alimentData, {
        headers: {
            Authorization: `${localStorage.getItem("userToken")}`,
        },
    });
    return response.data;
};

// Ajouter plusieurs aliments au garde-manger
export const ajouterPlusieursAlimentsGardeManger = async (alimentsData) => {
    const response = await axios.post(`${API_URL}/ajouter-multiples`, alimentsData, {
        headers: {
            Authorization: `${localStorage.getItem("userToken")}`,
        },
    });
    return response.data;
};

// Mettre à jour un aliment dans le garde-manger
export const mettreAJourAlimentGardeManger = async (id, updateData) => {
    const response = await axios.put(`${API_URL}/mettre-a-jour/${id}`, updateData, {
        headers: {
            Authorization: `${localStorage.getItem("userToken")}`,
        },
    });
    return response.data;
};

// Supprimer un aliment du garde-manger
export const supprimerAlimentGardeManger = async (id) => {
    const response = await axios.delete(`${API_URL}/supprimer/${id}`, {
        headers: {
            Authorization: `${localStorage.getItem("userToken")}`,
        },
    });
    return response.data;
};

export const fetchGardeManger = async () => {
    try {
        const userToken = localStorage.getItem("userToken"); // Récupérer le token JWT
        const response = await axios.get("http://localhost:8000/gardeMangers", {
            headers: {
                Authorization: `${userToken}`, // Inclure le token dans les en-têtes
            },
        });
        return response.data;
    } catch (error) {
        console.error(
            "Erreur lors de la récupération des aliments du garde-manger:",
            error,
        );
        throw error;
    }
};

export default {
    obtenirContenuGardeManger,
    ajouterAlimentGardeManger,
    ajouterPlusieursAlimentsGardeManger,
    mettreAJourAlimentGardeManger,
    supprimerAlimentGardeManger,
    fetchGardeManger,
};
