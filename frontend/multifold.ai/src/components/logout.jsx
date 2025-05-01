import React from 'react';
import API from '../api/auth';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await API.post('/logout');
      localStorage.removeItem('accessToken');
      window.location.href = '/'; 
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
        <a href="/" className='text-white' style={{textDecoration:'none'}}>Logout</a>
    </button>
  );
};

export default Logout;
