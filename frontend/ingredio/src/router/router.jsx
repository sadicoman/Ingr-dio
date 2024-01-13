import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../components/pages/Home/Home.jsx";
import Login from "../components/pages/Login/Login.jsx";
import Register from "../components/pages/Register/Register.jsx";
import LandingPage from "../components/pages/LandingPage/LandingPage.jsx";
import Recettes from "../components/pages/Recettes/Recettes.jsx";
import GardeManger from "../components/pages/GardeManger/GardeManger.jsx";
import Profil from "../components/pages/Profil/Profil.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Aliments from "../components/pages/Aliments/Aliments.jsx";
import RecetteDetails from "../components/pages/Recettes/RecetteDetails.jsx";

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
                path: "landingPage",
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
                path: "/recettes/:id",
                element: (
                    <PrivateRoute>
                        <RecetteDetails />
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
                path: "aliments",
                element: (
                    <PrivateRoute>
                        <Aliments />
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
        ],
    },
]);

export default router;
