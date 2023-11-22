import axios from "axios";

// URL de base de l'API backend
const API_URL = "http://localhost:8000";

// Fonction pour la connexion
export const logins = async (login, MotDePasse) => {
    console.log(login, MotDePasse);
    try {
        const datas = { login: login, MotDePasse };
        console.log("datas: ", datas);
        const response = await axios.post(`${API_URL}/users/login`, datas);
        // console.log("response: ", response);
        console.log("Réponse reçue : ", response.data);
        if (response.data.token) {
            localStorage.setItem("userToken", response.data.token);
        }
        return response.data;
    } catch (err) {
        console.error("Erreur lors de la connexion : ", err);
        throw err;
    }
};

// Fonction pour l'inscription
export const register = async (datas) => {
    try {
        const response = await axios.post(`${API_URL}/users/register`, datas);
        return response.data;
    } catch (err) {
        console.error("Erreur lors de l'inscription : ", err);
        throw err;
    }
};

// Fonction pour déconnecter l'utilisateur
export const logout = () => {
    localStorage.removeItem("userToken");
};

// Fonction pour obtenir le token stocké
export const getCurrentUserToken = () => {
    return localStorage.getItem("userToken");
};

export default {
    logins,
    register,
    logout,
    getCurrentUserToken,
};
