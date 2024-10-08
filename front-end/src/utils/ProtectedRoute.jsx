// src/utils/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { auth } = useContext(AuthContext);

    if (!auth.token) return <Navigate to="/login" />;
    if (!allowedRoles.includes(auth.role_id)) return <Navigate to="/unauthorized" />;

    return children;
};

export default ProtectedRoute;