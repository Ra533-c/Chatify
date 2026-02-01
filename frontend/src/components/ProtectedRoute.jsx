import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const { authUser } = useSelector((store) => store.user);

    // Agar user logged in nahi hai
    if (!authUser) {
        // Login page pe redirect karo
        return <Navigate to="/login" replace />;
    }

    // Agar logged in hai toh children (Chat App) render karo
    return children;
};

export default ProtectedRoute;