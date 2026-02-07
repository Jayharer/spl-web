import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux"


const PrivateRoute = ({ children }) => {
    const authState = useSelector((state) => state.auth)

    console.log("authState", authState);

    if (authState?.auth) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}

export default PrivateRoute;