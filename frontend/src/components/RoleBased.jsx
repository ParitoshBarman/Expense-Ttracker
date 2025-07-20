import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

function RoleBased({ allowedRoles, children }) {
    const { user } = useContext(AuthContext);

    // If no user or role is not allowed, render nothing
    if (!user || !allowedRoles.includes(user.role)) {
        return null;
    }

    return children;
}

export default RoleBased;
