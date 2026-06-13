const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const products = [
  {
    name: 'Caminadora Smart Pro-Run',
    price: 1299.99,
    description: 'Caminadora de última generación con pantalla táctil de 15 pulgadas, conexión Wi-Fi, altavoces Bluetooth, motor de 3.5 HP, y sistema de amortiguación inteligente para reducir el impacto en las articulaciones.',
    image: '/images/treadmill.png',
    category: 'Cardio',
    stock: 8
  },
  {
    name: 'Bicicleta Spinning Apex-X',
    price: 649.99,
    description: 'Bicicleta de spinning profesional con resistencia magnética silenciosa, volante de inercia de 18kg, asiento y manubrio ajustables, y soporte para tableta/teléfono con sensores de ritmo cardíaco.',
    image: '/images/spinning_bike.png',
    category: 'Cardio',
    stock: 15
  },
  {
    name: 'Estación Multi-Gimnasio IronClub',
    price: 1899.99,
    description: 'Estación de poleas y rack de musculación multifuncional. Incluye banco de pesas ajustable, barra de dominadas, poleas altas/bajas, y un juego de placas de peso de 80kg para entrenamiento de fuerza completo.',
    image: '/images/multigym.png',
    category: 'Fuerza',
    stock: 5
  }
];

const importData = async () => {
  try {
    // Elimina productos anteriores para evitar duplicados al re-ejecutar
    await Product.deleteMany();

    await Product.insertMany(products);
    console.log('¡3 Productos por defecto agregados con éxito al catálogo!');
    process.exit();
  } catch (error) {
    console.error(`Error al importar datos: ${error.message}`);
    process.exit(1);
  }
};

importData();
