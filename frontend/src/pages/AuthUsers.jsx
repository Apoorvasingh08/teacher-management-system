import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function AuthUsers() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');

  useEffect(() => {
    api.get('/auth-users')
       .then(res => setUsers(res.data.data))
       .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter(u =>
    `${u.first_name} ${u.last_name} ${u.email}`
      .toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="spinner">Loading...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>👥 Users</h2>
        <input className="search-box" placeholder="Search users..."
               value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th><th>Name</th><th>Email</th>
              <th>Status</th><th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr key={u.id}>
                <td>{i + 1}</td>
                <td>{u.first_name} {u.last_name}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`badge ${u.is_active ? 'active' : 'inactive'}`}>
                    {u.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>{new Date(u.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && <p className="empty">No users found.</p>}
    </div>
  );
}