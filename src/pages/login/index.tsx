/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../features/auth/authSlice';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { isAuthenticated, user, error, loading } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user) {
      user.admin ? navigate('/admin') : navigate('/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ "username": username, "password": password }));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-sm" style={{ width: '400px', border: '1px solid #dee2e6' }}>
        <h3 className="text-center mb-4 fw-bold">Login</h3>
        {error && <div className="alert alert-danger py-2 small text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-muted small">Username</label>
            <input type="text" className="form-control py-2" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="John" />
          </div>
          <div className="mb-4">
            <label className="form-label text-muted small">Password</label>
            <input type="password" className="form-control py-2" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="•••" />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2 fw-medium" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="text-center mt-3">
          <Link to="/register" className="text-decoration-none small">Don't have an account? Register here</Link>
        </div>
      </div>
    </div>
  );
}
