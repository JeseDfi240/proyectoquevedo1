import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{ background: '#1a1a1e', borderBottom: '1px solid #3f3f46', padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <Link to="/" style={{ color: '#ff5e00', fontSize: '1.5rem', fontWeight: '800', textDecoration: 'none' }}>FITMART</Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Catálogo</Link>
          <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>
            🛒 Carrito ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
          </Link>
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin" style={{ color: '#ff9100', textDecoration: 'none' }}>Admin</Link>
              )}
              <span style={{ color: '#9ca3af' }}>Hola, {user.name}</span>
              <button onClick={handleLogout} className="btn-secondary" style={{ padding: '0.4rem 0.8rem' }}>Salir</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Entrar</Link>
              <Link to="/register" className="btn-primary" style={{ padding: '0.4rem 0.8rem' }}>Registro</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
