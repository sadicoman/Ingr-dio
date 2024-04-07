import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// URL de base de l'API backend
const API_URL = "http://localhost:8000";

const getAuthConfig = () => {
	const token = localStorage.getItem("userToken");
	return {
		headers: { Authorization: token },
	};
};

const useAxiosInterceptor = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const interceptor = axios.interceptors.response.use(
			response => response,
			error => {
				if (error.response && error.response.status === 401) {
					logout(); // Assurez-vous que logout ne prend pas de paramètres ou ajustez cette partie selon votre implémentation
					navigate("/login");
				}
				return Promise.reject(error);
			},
		);

		return () => {
			axios.interceptors.response.eject(interceptor);
		};
	}, [navigate]); // Ajoutez navigate comme dépendance pour garantir que l'effet s'exécute à nouveau si navigate change, ce qui ne devrait normalement pas arriver.
};

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
			console.log(localStorage.getItem("userToken"));
			localStorage.setItem("userInfo", JSON.stringify(response.data.user)); // Stocker les infos de l'utilisateur
		}
		return response.data;
	} catch (err) {
		console.error("Erreur lors de la connexion : ", err);
		throw err;
	}
};

// Fonction pour l'inscription
export const register = async datas => {
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
	localStorage.removeItem("userInfo");
	localStorage.removeItem("isFirstVisit");
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

		const response = await axios.get(`${API_URL}/users/profile`, getAuthConfig());
		return response.data;
	} catch (err) {
		console.error("Erreur lors de la récupération du profil : ", err);
		throw err;
	}
};

// Fonction pour demander la réinitialisation du mot de passe
export const requestPasswordReset = async email => {
	try {
		const response = await axios.post(`${API_URL}/users/requestReset`, {
			Email: email,
		});
		return response.data;
	} catch (err) {
		console.error(
			"Erreur lors de la demande de réinitialisation du mot de passe : ",
			err,
		);
		throw err;
	}
};

// Fonction pour réinitialiser le mot de passe
export const resetPassword = async (token, nouveauMotDePasse) => {
	try {
		const response = await axios.post(`${API_URL}/users/reset-password`, {
			token,
			nouveauMotDePasse,
		});
		return response.data;
	} catch (err) {
		console.error("Erreur lors de la réinitialisation du mot de passe : ", err);
		throw err;
	}
};

export default {
	logins,
	register,
	logout,
	getCurrentUserToken,
	getUserProfile,
	requestPasswordReset,
	resetPassword,
};
