import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth.service";

const Logout = () => {
    const navigate = useNavigate();

    // Fonction pour gérer la déconnexion
    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return <button onClick={handleLogout}>Déconnexion</button>;
};

export default Logout;
