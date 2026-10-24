require('dotenv').config({ override: true });

const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

async function conectarBD() {
  try {
    const conexion = await db.getConnection();
    console.log('Conectado exitosamente a la base de datos MySQL');
    conexion.release();
  } catch (error) {
    console.error('Error al conectar con MySQL:', error.message);
    throw error;
  }
}

module.exports = { db, conectarBD };
