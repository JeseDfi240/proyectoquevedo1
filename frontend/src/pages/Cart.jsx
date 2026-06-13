import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center' }}>
        <h2>Tu carrito está vacío</h2>
        <Link to="/" className="btn-primary" style={{ marginTop: '1rem' }}>Ir al Catálogo</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Carrito de Compras</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div>
          {cartItems.map((item) => (
            <div key={item.product} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #3f3f46' }}>
              <img src={item.image} alt={item.name} style={{ width: '80px', borderRadius: '8px' }} />
              <div>
                <h4>{item.name}</h4>
                <p>${item.price.toLocaleString()} x {item.qty}</p>
              </div>
              <button onClick={() => removeFromCart(item.product)} className="btn-secondary" style={{ color: '#ef4444' }}>Eliminar</button>
            </div>
          ))}
        </div>
        <div style={{ background: '#1a1a1e', padding: '1.5rem', borderRadius: '12px', height: 'fit-content' }}>
          <h3>Resumen del Pedido</h3>
          <p>Total Artículos: {cartItems.reduce((acc, item) => acc + item.qty, 0)}</p>
          <h4 style={{ color: '#ff5e00', fontSize: '1.5rem' }}>Total: ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toLocaleString()}</h4>
          <button onClick={handleCheckout} className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Proceder al Pago</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
