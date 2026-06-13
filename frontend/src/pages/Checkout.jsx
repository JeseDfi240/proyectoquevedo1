import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Tarjeta de Crédito');

  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  const submitOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return alert('El carrito está vacío');

    const orderData = {
      orderItems: cartItems,
      shippingAddress: { address, city, postalCode, country },
      paymentMethod,
      totalPrice
    };

    const res = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(orderData)
    });

    if (res.ok) {
      alert('¡Pago exitoso! Pedido completado.');
      clearCart();
      navigate('/');
    } else {
      alert('Hubo un error al procesar el pedido.');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <h2>Checkout Seguro</h2>
      <div style={{ background: '#1a1a1e', padding: '2rem', borderRadius: '16px', border: '1px solid #3f3f46' }}>
        <form onSubmit={submitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4>Dirección de Envío</h4>
          <input type="text" placeholder="Dirección" required value={address} onChange={e => setAddress(e.target.value)} style={inputStyle} />
          <input type="text" placeholder="Ciudad" required value={city} onChange={e => setCity(e.target.value)} style={inputStyle} />
          <input type="text" placeholder="Código Postal" required value={postalCode} onChange={e => setPostalCode(e.target.value)} style={inputStyle} />
          <input type="text" placeholder="País" required value={country} onChange={e => setCountry(e.target.value)} style={inputStyle} />

          <h4 style={{ marginTop: '1rem' }}>Método de Pago</h4>
          <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} style={inputStyle}>
            <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
            <option value="PayPal">PayPal</option>
          </select>

          <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #3f3f46' }}>
            <h3 style={{ color: '#ff5e00' }}>Total a Pagar: ${totalPrice.toLocaleString()}</h3>
            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Confirmar y Pagar</button>
          </div>
        </form>
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

export default Checkout;
