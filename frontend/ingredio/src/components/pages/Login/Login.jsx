import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logins, requestPasswordReset } from "../../../services/auth.service";
import "./Login.scss";
import Logo from "../../templates/Menu/Logo";

const Login = () => {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [erreur, setErreur] = useState("");
    const [showResetForm, setShowResetForm] = useState(false);

    const onSubmit = async (datas) => {
        console.log(datas);
        try {
            const response = await logins(datas.login, datas.MotDePasse);
            if (response && response.token) {
                navigate("/landingPage");
            } else {
                setErreur("Erreur lors de la connexion. Veuillez vérifier vos login.");
            }
        } catch (err) {
            console.error("Erreur Axios: ", err.response ? err.response.data : err);
            setErreur("Erreur lors de la connexion. Veuillez vérifier vos login.");
        }
    };

    const onResetSubmit = async (data) => {
        try {
            await requestPasswordReset(data.email);
            alert("Un email de réinitialisation a été envoyé.");
            setShowResetForm(false);
        } catch (error) {
            console.error(
                "Erreur lors de la demande de réinitialisation du mot de passe",
                error,
            );
            alert("Erreur lors de la demande de réinitialisation du mot de passe.");
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
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="title title--niveau2">Connexion</h2>
                    {erreur && <p style={{ color: "red" }}>{erreur}</p>}
                    <Controller
                        name="login"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <div className="input-container ic2">
                                <input
                                    className="input"
                                    {...field}
                                    type="text"
                                    placeholder="Pseudo ou Email"
                                />
                            </div>
                        )}
                    />
                    {errors.login && <p>{errors.login.message}</p>}
                    <Controller
                        name="MotDePasse"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <div className="input-container ic2">
                                <input
                                    className="input"
                                    {...field}
                                    type="password"
                                    placeholder="Mot de Passe"
                                />
                            </div>
                        )}
                    />
                    {errors.MotDePasse && <p>{errors.MotDePasse.message}</p>}

                    <button className="submit" type="submit">
                        Se connecter
                    </button>
                </form>
                <div className="container__btn">
                    <Link to={`/register`}>Pas encore de compte ?</Link>
                    <button
                        className="btn__mdpOublier"
                        onClick={() => setShowResetForm(!showResetForm)}
                    >
                        <span className="button__text">
                            {showResetForm ? "Annuler" : "Mot de passe oublié ?"}
                        </span>
                    </button>
                </div>

                {showResetForm && (
                    <form className="form" onSubmit={handleSubmit(onResetSubmit)}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <div className="input-container ic2">
                                    <input
                                        className="input"
                                        {...field}
                                        type="email"
                                        placeholder="Votre email"
                                    />
                                </div>
                            )}
                        />
                        <button className="submit" type="submit">
                            Réinitialiser le mot de passe
                        </button>
                    </form>
                )}
            </section>
        </>
    );
};

export default Login;
