import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { getCurrentUserToken } from "../services/auth.service";

const PrivateRoute = ({ children }) => {
    const userToken = getCurrentUserToken();

    return userToken ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;
