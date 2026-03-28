import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <span className="nav-brand">🎓 Teacher MS</span>
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/teachers">Teachers</Link>
        <Link to="/users">Users</Link>
        <Link to="/add-teacher">Add Teacher</Link>
      </div>
      <div className="nav-user">
        <span>Hi, {user.first_name} 👋</span>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}