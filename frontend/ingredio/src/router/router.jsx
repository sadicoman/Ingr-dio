import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../components/pages/Home/Home.jsx";
import Login from "../components/pages/Login/Login.jsx";
import Register from "../components/pages/Register/Register.jsx";
import LandingPage from "../components/pages/LandingPage/LandingPage.jsx";

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
                element: <LandingPage />,
            },
        ],
    },
]);

export default router;
