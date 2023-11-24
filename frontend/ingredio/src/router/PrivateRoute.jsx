import { Navigate } from "react-router-dom";
import { getCurrentUserToken } from "../services/auth.service";

const PrivateRoute = ({ children }) => {
    const userToken = getCurrentUserToken();

    return userToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
