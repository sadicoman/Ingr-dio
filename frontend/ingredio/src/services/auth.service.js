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
        if (response.data.token && response.data.user) {
            localStorage.setItem("userToken", response.data.token);
            localStorage.setItem("userInfo", JSON.stringify(response.data.user)); // Stocker les infos de l'utilisateur
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
        if (err.response && err.response.data) {
            // Renvoyez l'objet d'erreur complet si disponible
            throw err.response.data;
        } else {
            // Renvoyez un message d'erreur générique
            throw new Error("Une erreur réseau s'est produite.");
        }
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

// Fonction pour récupérer le profil de l'utilisateur
export const getUserProfile = async () => {
    try {
        const token = getCurrentUserToken();
        if (!token) throw new Error("Token non trouvé");

        const response = await axios.get(`${API_URL}/users/profile`, {
            headers: { Authorization: `${token}` },
        });
        return response.data;
    } catch (err) {
        console.error("Erreur lors de la récupération du profil : ", err);
        throw err;
    }
};

export default {
    logins,
    register,
    logout,
    getCurrentUserToken,
    getUserProfile,
};
