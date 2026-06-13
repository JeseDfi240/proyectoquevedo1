const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Rutas
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json()); // Permitir parsear JSON

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('API de FitMart corriendo...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor activo en el puerto ${PORT}`));
