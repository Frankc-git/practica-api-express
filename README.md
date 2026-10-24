# API REST con Node.js, Express y MySQL

## Descripción del proyecto

Esta práctica consiste en desarrollar una API REST para gestionar registros de alumnos mediante Node.js y Express, utilizando MySQL como base de datos.

La aplicación permite realizar operaciones CRUD (crear, consultar, actualizar y eliminar registros). Las peticiones HTTP se prueban utilizando Postman.

## Tecnologías utilizadas

- Node.js
- Express.js
- MySQL
- MySQL Workbench
- Postman
- Visual Studio Code
- Git y GitHub

## Instalación y ejecución

1. Clonar el repositorio.
2. Abrir el proyecto en Visual Studio Code.
3. Instalar las dependencias con `npm install`.
4. Crear un archivo `.env` tomando como referencia `.env.example`.
5. Configurar la conexión a MySQL y crear la base de datos `api_practica` con su tabla `alumnos`.
6. Ejecutar el servidor con `node index.js`.

El servidor se ejecuta en `http://localhost:3000`.

## Endpoints de la API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Verificar el funcionamiento del servidor |
| GET | `/api/recursos` | Consultar todos los alumnos |
| GET | `/api/recursos/:id` | Consultar un alumno por ID |
| POST | `/api/recursos` | Registrar un nuevo alumno |
| PUT | `/api/recursos/:id` | Actualizar un alumno |
| DELETE | `/api/recursos/:id` | Eliminar un alumno |

## Base de datos

La base de datos `api_practica` contiene una tabla llamada `alumnos`, que almacena el identificador, nombre y carrera de cada estudiante.

Los datos se almacenan de forma persistente en MySQL.

## Pruebas realizadas

Se realizaron pruebas mediante Postman para verificar las operaciones GET, POST, PUT y DELETE.

También se utilizó MySQL Workbench para comprobar que los cambios realizados desde la API se reflejaran correctamente en la base de datos.

## Conclusión

El desarrollo de esta práctica permitió comprender el funcionamiento de una API REST y su integración con una base de datos relacional. Además, se aplicaron conocimientos sobre métodos HTTP, operaciones CRUD, manejo de respuestas y control de versiones GitHub.