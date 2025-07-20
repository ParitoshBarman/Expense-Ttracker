import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [form, setForm] = useState({ email: '', password: '', role: 'employee' });
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('/auth/register', form);
            alert('Registered successfully. Please login.');
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.message || 'Register failed');
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                <select name="role" value={form.role} onChange={handleChange}>
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit">Register</button>
            </form>
            <div className="auth-link">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </div>
    );
}

export default Register;
