import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../../services/auth.service";
import Logo from "../../templates/Menu/Logo";

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
        <>
            <header className="header header--login">
                <Logo className="logo" />
                <div className="header__retour">
                    <Link to={`/`}>Home</Link>
                </div>
            </header>
            <section className="section">
                <form className="form" onSubmit={handleSubmit}>
                    <h2 className="title title--niveau2">Inscription</h2>
                    <div className="input-container ic2">
                        <input
                            className="input"
                            type="text"
                            placeholder="Pseudo"
                            value={pseudo}
                            onChange={(e) => setPseudo(e.target.value)}
                        />
                    </div>
                    <div className="input-container ic2">
                        <input
                            className="input"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-container ic2">
                        <input
                            className="input"
                            type="password"
                            placeholder="Mot de passe"
                            value={motDePasse}
                            onChange={(e) => setMotDePasse(e.target.value)}
                        />
                    </div>
                    <button className="submit" type="submit">
                        S'inscrire
                    </button>
                    {erreurs.message && <p style={{ color: "red" }}>{erreurs.message}</p>}
                    {erreurs.details.map((erreur, index) => (
                        <p key={index} style={{ color: "red" }}>
                            {erreur}
                        </p>
                    ))}
                </form>
                <Link to={`/Login`}>Déja un compte ?</Link>
            </section>
        </>
    );
};

export default Register;
