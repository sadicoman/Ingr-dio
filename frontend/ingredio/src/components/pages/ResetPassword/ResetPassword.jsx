import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const ResetPassword = () => {
    const [MotDePasse, setMotDePasse] = useState("");
    const [token, setToken] = useState("");
    const [message, setMessage] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate(); // Utilisation de useNavigate pour la redirection

    useEffect(() => {
        const tokenFromUrl = searchParams.get("token");
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        }
    }, [searchParams]);

    const handlePasswordChange = (e) => {
        setMotDePasse(e.target.value);
    };

    const resetPassword = async (event) => {
        event.preventDefault();

        try {
            console.log(
                "Tentative de réinitialisation de mot de passe avec le token :",
                token,
            );
            console.log("Nouveau mot de passe :", MotDePasse);

            const response = await axios.post(
                "http://localhost:8000/users/resetPassword",
                { token, MotDePasse },
            );
            console.log("Réponse du serveur :", response.data);
            setMessage(response.data.message);

            // Redirection vers la page de connexion après la réinitialisation réussie
            if (response.data.message === "Mot de passe réinitialisé avec succès.") {
                navigate("/login"); // Remplacez "/login" par l'URL de votre page de connexion
            }
        } catch (error) {
            console.error("Erreur lors de la réinitialisation du mot de passe :", error);

            if (error.response && error.response.data && error.response.data.erreurs) {
                const erreursList = error.response.data.erreurs.map((erreur, index) => (
                    <li key={index}>{erreur}</li>
                ));
                console.log("Erreurs :", erreursList);
                setMessage(<ul>{erreursList}</ul>);
            } else {
                console.error(
                    "Une erreur s'est produite lors de la réinitialisation du mot de passe.",
                );
                setMessage(
                    "Une erreur s'est produite lors de la réinitialisation du mot de passe.",
                );
            }
        }
    };

    return (
        <section className="section">
            <form className="form" onSubmit={resetPassword}>
                <h2 className="title title--niveau2">Réinitialiser le mot de passe</h2>
                <div className="input-container ic1">
                    <input
                        className="input"
                        type="password"
                        value={MotDePasse}
                        onChange={handlePasswordChange}
                        placeholder="Nouveau mot de passe"
                    />
                </div>
                <button className="submit" type="submit">
                    Réinitialiser le mot de passe
                </button>
                {message && <p>{message}</p>}
            </form>
        </section>
    );
};

export default ResetPassword;
