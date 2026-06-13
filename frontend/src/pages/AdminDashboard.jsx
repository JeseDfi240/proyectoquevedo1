import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = { name, price: Number(price), description, image, category, stock: Number(stock) };
    
    const res = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(newProduct)
    });

    if (res.ok) {
      alert('¡Producto creado con éxito!');
      setName(''); setPrice(''); setDescription(''); setImage(''); setCategory(''); setStock('');
    } else {
      alert('Error al crear el producto.');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <h2>Panel de Administración - Crear Máquina</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <input type="text" placeholder="Nombre de la máquina" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
        <input type="number" placeholder="Precio" value={price} onChange={(e) => setPrice(e.target.value)} required style={inputStyle} />
        <textarea placeholder="Descripción detallada" value={description} onChange={(e) => setDescription(e.target.value)} required style={{ ...inputStyle, height: '100px' }} />
        <input type="text" placeholder="URL de la imagen" value={image} onChange={(e) => setImage(e.target.value)} required style={inputStyle} />
        <input type="text" placeholder="Categoría (Ej: Cardio, Fuerza)" value={category} onChange={(e) => setCategory(e.target.value)} required style={inputStyle} />
        <input type="number" placeholder="Stock disponible" value={stock} onChange={(e) => setStock(e.target.value)} required style={inputStyle} />
        <button type="submit" className="btn-primary">Registrar Máquina en Catálogo</button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: '0.8rem',
  background: '#1a1a1e',
  border: '1px solid #3f3f46',
  color: 'white',
  borderRadius: '8px',
  fontSize: '1rem'
};

export default AdminDashboard;
