import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(name, email, password);
    if (result.success) {
      navigate('/');
    } else {
      alert(result.message || 'Error al registrarse');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '4rem' }}>
      <div style={{ background: '#1a1a1e', padding: '2rem', borderRadius: '16px', border: '1px solid #3f3f46' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Crear Cuenta</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Nombre Completo" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            style={inputStyle} 
          />
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
          <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>Registrarse</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#9ca3af' }}>
          ¿Ya tienes cuenta? <Link to="/login" style={{ color: '#ff5e00', textDecoration: 'none' }}>Inicia sesión</Link>
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

export default Register;
