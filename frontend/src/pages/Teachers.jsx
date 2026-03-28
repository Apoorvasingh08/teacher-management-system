import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');

  useEffect(() => {
    api.get('/teachers')
       .then(res => setTeachers(res.data.data))
       .finally(() => setLoading(false));
  }, []);

  const filtered = teachers.filter(t =>
    `${t.first_name} ${t.last_name} ${t.university_name} ${t.department}`
      .toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="spinner">Loading...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>🎓 Teachers</h2>
        <div className="header-actions">
          <input className="search-box" placeholder="Search teachers..."
                 value={search} onChange={e => setSearch(e.target.value)} />
          <Link to="/add-teacher" className="btn-primary">+ Add Teacher</Link>
        </div>
      </div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th><th>Name</th><th>Email</th>
              <th>University</th><th>Department</th>
              <th>Gender</th><th>Year Joined</th><th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, i) => (
              <tr key={t.id}>
                <td>{i + 1}</td>
                <td>{t.first_name} {t.last_name}</td>
                <td>{t.email}</td>
                <td>{t.university_name}</td>
                <td>{t.department}</td>
                <td>{t.gender}</td>
                <td>{t.year_joined}</td>
                <td>{t.phone || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && <p className="empty">No teachers found.</p>}
    </div>
  );
}