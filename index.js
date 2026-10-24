
require('dotenv').config({ override: true });

const express = require('express');
const { db, conectarBD } = require('./config/db');

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.send('API REST conectada a MySQL');
});

// GET: consultar todos los alumnos
app.get('/api/recursos', async (req, res) => {
  try {
    const [alumnos] = await db.query('SELECT * FROM alumnos');
    res.status(200).json(alumnos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar alumnos' });
  }
});

// GET: consultar un alumno por ID
app.get('/api/recursos/:id', async (req, res) => {
  try {
    const [alumnos] = await db.query(
      'SELECT * FROM alumnos WHERE id = ?',
      [req.params.id]
    );

    if (alumnos.length === 0) {
      return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }

    res.status(200).json(alumnos[0]);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar alumno' });
  }
});

// POST: registrar un alumno
app.post('/api/recursos', async (req, res) => {
  const { nombre, carrera } = req.body;

  if (!nombre?.trim() || !carrera?.trim()) {
    return res.status(400).json({
      mensaje: 'Nombre y carrera son obligatorios'
    });
  }

  try {
    const [resultado] = await db.query(
      'INSERT INTO alumnos (nombre, carrera) VALUES (?, ?)',
      [nombre, carrera]
    );

    res.status(201).json({
      id: resultado.insertId,
      nombre,
      carrera
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar alumno' });
  }
});

// PUT: actualizar un alumno
app.put('/api/recursos/:id', async (req, res) => {
  const { nombre, carrera } = req.body;

  if (!nombre?.trim() || !carrera?.trim()) {
    return res.status(400).json({
      mensaje: 'Nombre y carrera son obligatorios'
    });
  }

  try {
    const [resultado] = await db.query(
      'UPDATE alumnos SET nombre = ?, carrera = ? WHERE id = ?',
      [nombre, carrera, req.params.id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }

    res.status(200).json({
      id: Number(req.params.id),
      nombre,
      carrera
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar alumno' });
  }
});

// DELETE: eliminar un alumno
app.delete('/api/recursos/:id', async (req, res) => {
  try {
    const [resultado] = await db.query(
      'DELETE FROM alumnos WHERE id = ?',
      [req.params.id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Alumno no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Alumno eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar alumno' });
  }
});

// Iniciar servidor después de verificar MySQL
async function iniciarServidor() {
  try {
    await conectarBD();

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar la API.');
    process.exitCode = 1;
    await db.end();
  }
}

iniciarServidor();
