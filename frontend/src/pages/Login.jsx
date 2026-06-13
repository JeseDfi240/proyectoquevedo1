import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      alert(result.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '4rem' }}>
      <div style={{ background: '#1a1a1e', padding: '2rem', borderRadius: '16px', border: '1px solid #3f3f46' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="email" 
            placeholder="Correo Electrónico" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={inputStyle} 
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={inputStyle} 
          />
          <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>Entrar</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#9ca3af' }}>
          ¿No tienes cuenta? <Link to="/register" style={{ color: '#ff5e00', textDecoration: 'none' }}>Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: '0.8rem',
  background: '#121214',
  border: '1px solid #3f3f46',
  color: 'white',
  borderRadius: '8px',
  fontSize: '1rem'
};

export default Login;
