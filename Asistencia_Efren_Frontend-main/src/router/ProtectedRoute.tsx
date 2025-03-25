import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext/UserContext';

interface ProtectedRouteProps {
    element: React.ReactNode;
    requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, requiredRole }) => {
    const ContxValues = useContext(UserContext);
    const userRole = ContxValues?.user.user_role;

    if (!ContxValues?.logged) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return <>{element}</>;
};

export default ProtectedRoute;
