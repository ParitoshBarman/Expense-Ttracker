import { useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/auth/login', form);
            login(res.data.user, res.data.token);
            res.data.user.role === 'admin' ? navigate('/admin') : navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            <div className="auth-link">
                Don't have an account? <Link to="/register">Register</Link>
            </div>
        </div>
    );
}

export default Login;
