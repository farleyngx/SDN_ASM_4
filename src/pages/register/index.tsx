import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosClient from '../../shared/api/axiosClient';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [info, setInfo] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosClient.post('/users/register', { username, password, admin: isAdmin });
      setInfo('Đăng ký thành công! Đang chuyển hướng...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err: any) {
      setInfo(err.response?.data?.message || err.response?.data?.err || 'Username đã tồn tại trên hệ thống!');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-sm" style={{ width: '400px' }}>
        <h3 className="text-center mb-4 fw-bold">Register</h3>
        {info && <div className="alert alert-info py-2 small text-center">{info}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label text-muted small">Username</label>
            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label text-muted small">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-check mb-4">
            <input type="checkbox" className="form-check-input" id="adminCheck" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
            <label className="form-check-label small text-muted" htmlFor="adminCheck">Đăng ký với đặc quyền tài khoản Admin</label>
          </div>
          <button type="submit" className="btn btn-success w-100 py-2">Create Account</button>
        </form>
        <div className="text-center mt-3"><Link to="/login" className="small text-decoration-none">Back to Login</Link></div>
      </div>
    </div>
  );
}
