import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../../services/auth.service";

const Register = () => {
    const [registerData, setRegisterData] = useState({
        pseudo: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            await register(registerData);
            navigate("/login"); // Rediriger vers la page de connexion
        } catch (error) {
            console.error("Erreur d'inscription :", error);
        }
    };

    return (
        <div>
            <h2>Inscription</h2>
            <form onSubmit={handleRegister}>
                {/* Champs de formulaire */}
                <button type="submit">S'enregistrer</button>
            </form>
        </div>
    );
};

export default Register;
