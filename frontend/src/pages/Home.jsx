import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: '800' }}>EQUIPO DE ENTRENAMIENTO PROFESIONAL</h1>
      <p style={{ textAlign: 'center', color: '#9ca3af', marginBottom: '3rem' }}>Lleva tu rendimiento al siguiente nivel con nuestras máquinas premium.</p>
      
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <div className="product-image-container">
              <img src={product.image} alt={product.name} className="product-image" />
            </div>
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', flexGrow: 1 }}>{product.description}</p>
              <div className="product-price">${product.price.toLocaleString()}</div>
              <button 
                onClick={() => {
                  addToCart(product, 1);
                  alert(`${product.name} añadido al carrito.`);
                }} 
                className="btn-primary"
              >
                Añadir al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
