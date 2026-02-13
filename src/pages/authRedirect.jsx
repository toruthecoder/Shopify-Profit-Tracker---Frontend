import { Navigate } from "react-router-dom";

const AuthRedirect = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AuthRedirect;