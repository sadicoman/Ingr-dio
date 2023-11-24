import axios from "axios";

const API_URL = "http://localhost:8000/aliments"; // Remplacez avec votre URL API

export const obtenirTousAliments = async () => {
    return await axios.get(API_URL, {
        headers: {
            Authorization: ` ${localStorage.getItem("userToken")}`,
        },
    });
};

export const obtenirAlimentParId = async (id) => {
    return await axios.get(`${API_URL}/${id}`, {
        headers: {
            Authorization: ` ${localStorage.getItem("userToken")}`,
        },
    });
};

export const creerAliment = async (alimentData) => {
    return await axios.post(API_URL, alimentData, {
        headers: {
            Authorization: ` ${localStorage.getItem("userToken")}`,
        },
    });
};

export const mettreAJourAliment = async (id, updateData) => {
    return await axios.put(`${API_URL}/${id}`, updateData, {
        headers: {
            Authorization: ` ${localStorage.getItem("userToken")}`,
        },
    });
};

export const supprimerAliment = async (id) => {
    return await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: ` ${localStorage.getItem("userToken")}`,
        },
    });
};
