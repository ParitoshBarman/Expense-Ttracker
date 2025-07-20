import { useContext, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import RoleBased from './RoleBased';
import { NavLink } from 'react-router-dom';

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div className="navbar-brand">💸 Expense Tracker</div>

            </div>

            {user && (
                <div className={`navbar-right ${menuOpen ? 'show' : ''}`}>
                    <NavLink to={'/dashboard'} className={({ isActive }) => (isActive ? "active-link" : "")}>Home</NavLink>
                    <RoleBased allowedRoles={['admin']}>
                        <NavLink to={'/admin'} className={({ isActive }) => (isActive ? "active-link" : "")}>Go To Admin View</NavLink>
                    </RoleBased>
                    <span className="user-info">{user.email} ({user.role})</span>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
                <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                      {menuOpen?"✖":"☰"}
                </button>
        </nav>
    );
}

export default Navbar;
