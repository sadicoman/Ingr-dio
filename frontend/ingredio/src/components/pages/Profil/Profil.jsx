import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { getUserProfile, resetPassword } from "../../../services/auth.service";
import Logout from "../../logout/logout";
import Header from "../../templates/Header/Header";
import "./Profil.scss";

const Profil = () => {
    const [user, setUser] = useState({});
    const [showForm, setShowForm] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const labelRef = useRef(null);
    const cutRef = useRef(null);

    useEffect(() => {
        if (labelRef.current && cutRef.current) {
            const labelWidth1 = labelRef.current.offsetWidth;
            cutRef.current.style.width = `${labelWidth1}px`;
        }
        const fetchUserProfile = async () => {
            try {
                const userInfo = await getUserProfile();
                setUser(userInfo);
            } catch (error) {
                console.error("Erreur lors de la récupération du profil", error);
            }
        };

        fetchUserProfile();
    }, []);

    const handlePasswordChange = async ({ oldPassword, newPassword }) => {
        try {
            await resetPassword(oldPassword, newPassword);
            alert("Mot de passe changé avec succès!");
            reset();
            setShowForm(false);
        } catch (error) {
            console.error("Erreur lors du changement de mot de passe", error);
            alert("Erreur lors du changement de mot de passe");
        }
    };

    return (
        <>
            <Header />

            <main>
                <section className="section section--bas">
                    <Logout />
                    <h1 className="title">Page de Profil</h1>
                    <ul className="profil__list">
                        <li className="profil__el">
                            <p>Pseudo: {user.pseudo}</p>
                        </li>
                        <li className="profil__el">
                            <p>Email: {user.email}</p>
                        </li>
                        <li className="profil__el">
                            <div>
                                <p>Mot de passe :</p>
                            </div>
                            <ul className="info__list">
                                <li className="info__el">
                                    <p>........</p>
                                </li>
                                <li className="info__el">
                                    <button
                                        className="btn--mdp"
                                        onClick={() => setShowForm(!showForm)}
                                    >
                                        <span className="button__text">
                                            {showForm ? "Annuler" : "Modifier"}
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    {showForm && (
                        <form
                            className="form"
                            onSubmit={handleSubmit(handlePasswordChange)}
                        >
                            <div className="input-container ic1">
                                <input
                                    className="input"
                                    {...register("oldPassword")}
                                    type="password"
                                    // placeholder="Ancien mot de passe"
                                />
                                <div className="cut" ref={cutRef}></div>
                                <label className="iLabel" ref={labelRef}>
                                    Ancien mot de passe
                                </label>
                            </div>
                            <div className="input-container ic2">
                                <input
                                    className="input"
                                    {...register("newPassword")}
                                    type="password"
                                    // placeholder="Nouveau mot de passe"
                                />
                                <div className="cut" ref={cutRef}></div>
                                <label className="iLabel" ref={labelRef}>
                                    Nouveau mot de passe
                                </label>
                            </div>
                            <button className="submit" type="submit">
                                Confirmer le changement
                            </button>
                        </form>
                    )}
                </section>
            </main>
        </>
    );
};

export default Profil;
