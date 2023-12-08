import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getUserProfile, resetPassword } from "../../../services/auth.service";
import Logout from "../../logout/logout";
import Header from "../../templates/Header/Header";

const Profil = () => {
    const [user, setUser] = useState({});
    const [showForm, setShowForm] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
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
            <Logout />
            <main>
                <section>
                    <h1>Page de Profil</h1>
                    <p>Pseudo: {user.pseudo}</p>
                    <p>Email: {user.email}</p>

                    <button onClick={() => setShowForm(!showForm)}>
                        {showForm ? "Annuler" : "Changer de mot de passe"}
                    </button>

                    {showForm && (
                        <form onSubmit={handleSubmit(handlePasswordChange)}>
                            <input
                                {...register("oldPassword")}
                                type="password"
                                placeholder="Ancien mot de passe"
                            />
                            <input
                                {...register("newPassword")}
                                type="password"
                                placeholder="Nouveau mot de passe"
                            />
                            <button type="submit">Confirmer le changement</button>
                        </form>
                    )}
                </section>
            </main>
        </>
    );
};

export default Profil;
