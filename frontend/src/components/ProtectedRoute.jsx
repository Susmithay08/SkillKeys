import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, allowGuest = false }) {
    const token = localStorage.getItem('token');
    const guestMode = localStorage.getItem('guestMode');

    // If route allows guest mode and user is in guest mode, allow access
    if (allowGuest && guestMode === 'true') {
        return children;
    }

    // If user has token, allow access
    if (token) {
        return children;
    }

    // Otherwise, redirect to login
    return <Navigate to="/login" replace />;
}

export default ProtectedRoute;