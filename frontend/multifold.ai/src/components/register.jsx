import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Register = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', username: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Form data being sent:", formData); 
      await API.post('/register', formData);
      setMessage('Registration successful. You can now log in.');
      setTimeout(() => {
        navigate('/'); 
      }, 1500);
    } catch (error) {
      console.error(error);
      setMessage(error?.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h4 className="mb-3">Register</h4>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              className="form-control"
              onChange={handleChange}
              value={formData.fullName}
              required
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleChange}
              value={formData.password}
              required
            />
          </div>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              onChange={handleChange}
              value={formData.username}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="mt-3">
          Already have an account? <a href="/">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
