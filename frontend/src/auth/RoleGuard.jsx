import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const RoleGuard = ({ allowedRole, children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (user.role !== allowedRole) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default RoleGuard;
