import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function AddTeacher() {
  const [form, setForm] = useState({
    email: '', first_name: '', last_name: '', password: '',
    university_name: '', gender: '', year_joined: '', department: '', phone: ''
  });
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await api.post('/teachers', form);
      setSuccess('Teacher added successfully! Redirecting...');
      setTimeout(() => navigate('/teachers'), 1500);
    } catch (err) {
      const data = err.response?.data;
      const errors = data?.messages || data?.errors;
      const message = errors
        ? Array.isArray(errors)
          ? errors.join(', ')
          : Object.values(errors).flat().join(', ')
        : data?.message || err.message || 'Failed to add teacher';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2>➕ Add New Teacher</h2>
      {error   && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}
      <form className="teacher-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Account Info</legend>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input name="first_name" value={form.first_name}
                     onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input name="last_name" value={form.last_name}
                     onChange={handleChange} required />
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" value={form.email}
                   onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" value={form.password}
                   onChange={handleChange} required />
          </div>
        </fieldset>
        <fieldset>
          <legend>Teacher Details</legend>
          <div className="form-group">
            <label>University Name</label>
            <input name="university_name" value={form.university_name}
                   onChange={handleChange} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Department</label>
              <input name="department" value={form.department}
                     onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={form.gender}
                      onChange={handleChange} required>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Year Joined</label>
              <input name="year_joined" type="number"
                     min="1900" max={new Date().getFullYear()}
                     value={form.year_joined} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone (optional)</label>
              <input name="phone" value={form.phone} onChange={handleChange} />
            </div>
          </div>
        </fieldset>
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Teacher'}
        </button>
      </form>
    </div>
  );
}