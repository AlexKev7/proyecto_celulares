const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; // Puerto dinámico para producción

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST, // Host de la base de datos
    user: process.env.DB_USER, // Usuario de la base de datos
    password: process.env.DB_PASSWORD, // Contraseña de la base de datos
    database: process.env.DB_NAME, // Nombre de la base de datos
    port: process.env.DB_PORT // Puerto de la base de datos
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos.');

    // Crear la tabla 'contactos' si no existe
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS contactos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(255) NOT NULL,
            correo VARCHAR(255) NOT NULL,
            telefono VARCHAR(20),
            asunto VARCHAR(255),
            mensaje TEXT NOT NULL,
            fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    db.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Error al crear la tabla contactos:', err);
            return;
        }
        console.log('Tabla contactos verificada o creada exitosamente.');
    });
});

// Ruta para manejar el envío del formulario
app.post('/api/contacto', (req, res) => {
    const { nombre, correo, telefono, asunto, mensaje } = req.body;

    const query = 'INSERT INTO contactos (nombre, correo, telefono, asunto, mensaje) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nombre, correo, telefono, asunto, mensaje], (err, result) => {
        if (err) {
            console.error('Error al insertar datos:', err);
            res.status(500).send('Error al guardar los datos.');
            return;
        }
        res.status(200).send('Datos guardados exitosamente.');
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});