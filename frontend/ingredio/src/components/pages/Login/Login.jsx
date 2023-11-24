import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logins } from "../../../services/auth.service";

const Login = () => {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [erreur, setErreur] = useState("");

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

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Connexion</h2>
                {erreur && <p style={{ color: "red" }}>{erreur}</p>}
                <Controller
                    name="login"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <input {...field} type="text" placeholder="Pseudo ou Email" />
                    )}
                />
                {errors.login && <p>{errors.login.message}</p>}

                <Controller
                    name="MotDePasse"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <input {...field} type="password" placeholder="Mot de Passe" />
                    )}
                />
                {errors.MotDePasse && <p>{errors.MotDePasse.message}</p>}

                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;
