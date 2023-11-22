import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../../services/auth.service";

const Register = () => {
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const navigate = useNavigate();

    const [erreurs, setErreurs] = useState({ message: "", details: [] });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await register({
                Pseudo: pseudo,
                Email: email,
                MotDePasse: motDePasse,
            });
            if (response) {
                navigate("/login"); // Rediriger vers la page de connexion après l'inscription
            }
        } catch (err) {
            setErreurs({
                message: err.message || "Une erreur s'est produite.",
                details: err.erreurs || [],
            });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Inscription</h2>
                <input
                    type="text"
                    placeholder="Pseudo"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={motDePasse}
                    onChange={(e) => setMotDePasse(e.target.value)}
                />
                <button type="submit">S'inscrire</button>
                {erreurs.message && <p style={{ color: "red" }}>{erreurs.message}</p>}
                {erreurs.details.map((erreur, index) => (
                    <p key={index} style={{ color: "red" }}>
                        {erreur}
                    </p>
                ))}
            </form>
        </div>
    );
};

export default Register;
