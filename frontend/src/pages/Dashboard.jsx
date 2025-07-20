import { useState, useEffect } from 'react';
import axios from '../api/axios';
import Navbar from '../components/Navbar';

function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [form, setForm] = useState({
        amount: '',
        category: '',
        date: '',
        notes: ''
    });
    const [file, setFile] = useState(null);

    const fetchExpenses = async () => {
        try {
            const res = await axios.get('/expenses/my');
            setExpenses(res.data);
        } catch (err) {
            alert('Failed to load expenses');
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
    const handleFileChange = e => setFile(e.target.files[0]);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            let res;
            if (file) {
                const data = new FormData();
                data.append('receipt', file);
                Object.entries(form).forEach(([key, val]) => data.append(key, val));
                res = await axios.post('/expenses/with-receipt', data);
            } else {
                res = await axios.post('/expenses', form);
            }
            alert('Expense added!');
            setForm({ amount: '', category: '', date: '', notes: '' });
            setFile(null);
            fetchExpenses();
        } catch (err) {
            alert('Failed to add expense');
        }
    };

    return (
        <>
            <Navbar />
            <div className="dashboard-container">
                <h2>My Expenses</h2>

                <form className="expense-form" onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} required />
                    <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
                    <input type="date" name="date" value={form.date} onChange={handleChange} required />
                    <input type="text" name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />
                    <input type="file" name="receipt" onChange={handleFileChange} />
                    <button type="submit">Add Expense</button>
                </form>

                <table className="expense-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Receipt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((e) => (
                            <tr key={e._id}>
                                <td>{new Date(e.date).toLocaleDateString()}</td>
                                <td>₹{e.amount}</td>
                                <td>{e.category}</td>
                                <td className={e.status}>{e.status}</td>
                                <td>
                                    {e.receipt ? (
                                        <a href={`http://localhost:5000/${e.receipt}`} target="_blank" rel="noopener noreferrer" className="view-btn">
                                            View
                                        </a>
                                    ) : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Dashboard;
