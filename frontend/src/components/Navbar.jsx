import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import RoleBased from './RoleBased';
import { NavLink } from 'react-router-dom';

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">💸 Expense Tracker</div>
            {user && (
                <div className="navbar-right">
                    <NavLink to={'/dashboard'} className={({isActive}) => (isActive ? "active-link" : "")}>Home</NavLink>
                    <RoleBased allowedRoles={['admin']}><NavLink to={'/admin'} className={({isActive}) => (isActive ? "active-link" : "")}>Go To Admin View</NavLink></RoleBased>
                    <span>{user.email} ({user.role})</span>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
