import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import Navbar from '../components/Navbar';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

ChartJS.register(
    BarElement,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend
);

function AdminPanel() {
    const [categoryData, setCategoryData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        status: '',
        category: '',
        userEmail: '',
        startDate: '',
        endDate: ''
    });

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const fetchAll = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const [cat, month, allExpenses, audit] = await Promise.all([
                axios.get('/analytics/category'),
                axios.get('/analytics/monthly'),
                axios.get(`/expenses/all?${queryParams}`),
                axios.get('/audit')
            ]);
            setCategoryData(cat.data);
            setMonthlyData(month.data);
            setExpenses(allExpenses.data);
            setLogs(audit.data);
        } catch (err) {
            alert('Failed to load admin data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`/expenses/${id}/status`, { status });
            fetchAll();
        } catch {
            alert('Failed to update status');
        }
    };

    const downloadCSV = async () => {
        try {
            const res = await axios.get('/expenses/export/csv', {
                responseType: 'blob'
            });
            const blob = new Blob([res.data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'expenses.csv';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            alert('Failed to download CSV');
        }
    };

    const barChartData = {
        labels: categoryData.map(item => item._id),
        datasets: [{
            label: 'Expenses by Category',
            data: categoryData.map(item => item.total),
            backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }]
    };

    const lineChartData = {
        labels: monthlyData.map(item => item.month),
        datasets: [{
            label: 'Monthly Expenses',
            data: monthlyData.map(item => item.total),
            fill: false,
            borderColor: 'rgba(255, 99, 132, 0.6)'
        }]
    };

    return (
        <>
            <Navbar />
            <div className="admin-panel">
                <h2>Admin Panel</h2>

                <div className="charts-container">
                    {loading ? (
                        <div style={{ height: '300px', background: '#eee', borderRadius: '10px', animation: 'pulse 1.5s infinite' }} />
                    ) : (
                        <>
                            <Bar data={barChartData} />
                            <Line data={lineChartData} className="mt-6" />
                        </>
                    )}
                </div>

                <button onClick={downloadCSV} className="export-btn">
                    📥 Export CSV
                </button>

                {/* Filters Section */}
                <div className="filters">
                    <h4>Filter Expenses</h4>
                    <div className="filter-grid">
                        <input
                            type="text"
                            name="userEmail"
                            placeholder="User Email"
                            value={filters.userEmail}
                            onChange={handleFilterChange}
                        />
                        <select name="status" value={filters.status} onChange={handleFilterChange}>
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={filters.category}
                            onChange={handleFilterChange}
                        />
                        <input
                            type="date"
                            name="startDate"
                            value={filters.startDate}
                            onChange={handleFilterChange}
                        />
                        <input
                            type="date"
                            name="endDate"
                            value={filters.endDate}
                            onChange={handleFilterChange}
                        />
                        <button onClick={fetchAll} className="filter-btn">Apply Filter</button>
                    </div>
                </div>

                <h3>All Expenses</h3>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Actions</th>
                            <th>Receipt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            [...Array(3)].map((_, i) => (
                                <tr key={i}>
                                    <td colSpan={7}>
                                        <div style={{
                                            background: '#eee',
                                            height: '20px',
                                            borderRadius: '4px',
                                            animation: 'pulse 1.5s infinite'
                                        }} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            expenses.map(e => (
                                <tr key={e._id}>
                                    <td>{e.user?.email}</td>
                                    <td>{new Date(e.date).toLocaleDateString()}</td>
                                    <td>₹{e.amount}</td>
                                    <td>{e.category}</td>
                                    <td className={e.status}>{e.status}</td>
                                    <td>
                                        {['approved', 'rejected'].includes(e.status) ? (
                                            '-'
                                        ) : (
                                            <>
                                                <button onClick={() => updateStatus(e._id, 'approved')} className='approve-btn'>Approve</button>{' '}
                                                <button onClick={() => updateStatus(e._id, 'rejected')} className='reject-btn'>Reject</button>
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        {e.receipt ? (
                                            <a href={`${BASE_URL}/${e.receipt}`} target="_blank" rel="noopener noreferrer" className="view-btn">
                                                View
                                            </a>
                                        ) : '-'}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                <div className="audit-log-wrapper">
                    <h3>Audit Logs</h3>
                    <ul className="audit-log">
                        {loading ? (
                            [...Array(4)].map((_, i) => (
                                <li key={i}>
                                    <div style={{
                                        background: '#ddd',
                                        height: '14px',
                                        width: '100%',
                                        borderRadius: '4px',
                                        animation: 'pulse 1.5s infinite'
                                    }} />
                                </li>
                            ))
                        ) : (
                            logs.map(log => (
                                <li key={log._id}>
                                    [{new Date(log.timestamp).toLocaleString()}] {log.user?.email} → {log.action}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default AdminPanel;