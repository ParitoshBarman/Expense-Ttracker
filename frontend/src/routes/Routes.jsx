import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import RoleGuard from '../auth/RoleGuard';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import AdminPanel from '../pages/AdminPanel';

function AppRoutes() {
    const { user } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to={'/login'} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/" />}
            />

            <Route
                path="/admin"
                element={
                    <RoleGuard allowedRole="admin">
                        <AdminPanel />
                    </RoleGuard>
                }
            />

            {/* 404 Not Found Route */}
            <Route path="*" element={<h2 style={{ textAlign: 'center', marginTop: '40px' }}>404 - Page Not Found</h2>} />
        </Routes>
    );
}

export default AppRoutes;
