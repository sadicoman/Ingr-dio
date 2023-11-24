import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../components/pages/Home/Home.jsx";
import Login from "../components/pages/Login/Login.jsx";
import Register from "../components/pages/Register/Register.jsx";
import LandingPage from "../components/pages/LandingPage/LandingPage.jsx";
import Recettes from "../components/pages/Recettes/Recettes.jsx"; // Assurez-vous d'avoir ce composant
import GardeManger from "../components/pages/GardeManger/GardeManger.jsx"; // Assurez-vous d'avoir ce composant
import Profil from "../components/pages/Profil/Profil.jsx"; // Assurez-vous d'avoir ce composant
import PrivateRoute from "./PrivateRoute.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "landingPage", // Utilisation de PrivateRoute ici
                element: (
                    <PrivateRoute>
                        <LandingPage />
                    </PrivateRoute>
                ),
            },
            {
                path: "recettes",
                element: (
                    <PrivateRoute>
                        <Recettes />
                    </PrivateRoute>
                ),
            },
            {
                path: "garde-manger",
                element: (
                    <PrivateRoute>
                        <GardeManger />
                    </PrivateRoute>
                ),
            },
            {
                path: "profil",
                element: (
                    <PrivateRoute>
                        <Profil />
                    </PrivateRoute>
                ),
            },
            // Ajoutez d'autres routes publiques ou protégées ici
        ],
    },
]);

export default router;
