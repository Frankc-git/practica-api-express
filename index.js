
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Datos almacenados temporalmente en memoria
let alumnos = [
  { id: 1, nombre: 'Carlos', carrera: 'Ingeniería en Sistemas' },
  { id: 2, nombre: 'Ana', carrera: 'Ingeniería Industrial' },
  { id: 3, nombre: 'Luis', carrera: 'Ingeniería Informática' }
];

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor API REST funcionando correctamente');
});

// Consultar todos los alumnos
app.get('/api/recursos', (req, res) => {
  res.status(200).json(alumnos);
});

// Consultar un alumno por ID
app.get('/api/recursos/:id', (req, res) => {
  const alumno = alumnos.find(a => a.id === Number(req.params.id));

  if (!alumno) {
    return res.status(404).json({ mensaje: 'Alumno no encontrado' });
  }

  res.status(200).json(alumno);
});

// Agregar un alumno
app.post('/api/recursos', (req, res) => {
  const { nombre, carrera } = req.body;

  if (typeof nombre !== 'string' || !nombre.trim() ||
      typeof carrera !== 'string' || !carrera.trim()) {
    return res.status(400).json({ mensaje: 'Nombre y carrera son obligatorios' });
  }

  const nuevoId = alumnos.length
    ? Math.max(...alumnos.map(a => a.id)) + 1
    : 1;

  const nuevoAlumno = { id: nuevoId, nombre, carrera };
  alumnos.push(nuevoAlumno);

  res.status(201).json(nuevoAlumno);
});

// Modificar un alumno
app.put('/api/recursos/:id', (req, res) => {
  const alumno = alumnos.find(a => a.id === Number(req.params.id));

  if (!alumno) {
    return res.status(404).json({ mensaje: 'Alumno no encontrado' });
  }

  const { nombre, carrera } = req.body;

  if (typeof nombre !== 'string' || !nombre.trim() ||
      typeof carrera !== 'string' || !carrera.trim()) {
    return res.status(400).json({ mensaje: 'Nombre y carrera son obligatorios' });
  }

  alumno.nombre = nombre;
  alumno.carrera = carrera;

  res.status(200).json(alumno);
});

// Eliminar un alumno
app.delete('/api/recursos/:id', (req, res) => {
  const indice = alumnos.findIndex(a => a.id === Number(req.params.id));

  if (indice === -1) {
    return res.status(404).json({ mensaje: 'Alumno no encontrado' });
  }

  alumnos.splice(indice, 1);
  res.status(200).json({ mensaje: 'Alumno eliminado correctamente' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
