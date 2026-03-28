import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function Dashboard() {
  const [stats, setStats]     = useState({ users: 0, teachers: 0 });
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    Promise.all([api.get('/auth-users'), api.get('/teachers')])
      .then(([usersRes, teachersRes]) => {
        setStats({
          users:    usersRes.data.data.length,
          teachers: teachersRes.data.data.length,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2>Dashboard</h2>
          <p className="subtitle">Welcome back, {user.first_name}!</p>
        </div>
        <Link to="/add-teacher" className="btn-primary">+ Add Teacher</Link>
      </div>
      {loading ? <div className="spinner">Loading...</div> : (
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon">👥</span>
            <span className="stat-number">{stats.users}</span>
            <span className="stat-label">Total Users</span>
            <Link to="/users" className="stat-link">View all →</Link>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🎓</span>
            <span className="stat-number">{stats.teachers}</span>
            <span className="stat-label">Total Teachers</span>
            <Link to="/teachers" className="stat-link">View all →</Link>
          </div>
        </div>
      )}
    </div>
  );
}