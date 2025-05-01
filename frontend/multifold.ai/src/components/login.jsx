import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(''); 
    try {
      const res = await API.post('/login', formData);
      localStorage.setItem('accessToken', res.data.accessToken);
      setMessage('Login successful. Redirecting...');
      setTimeout(() => {
        navigate('/logout'); 
      }, 1500);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 400) {
        setMessage('Invalid email or password.');
      } else {
        setMessage('Something went wrong. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h4 className="mb-3">Login</h4>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-3">
          Don't have an account? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
