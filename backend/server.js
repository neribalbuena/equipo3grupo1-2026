const express = require('express');
const cors = require('cors'); // Importante para permitir peticiones desde el frontend
const db = require('./conexion'); // Trae la conexión a MySQL de conexion.js

const app = express();
const PORT = 3010;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// RUTA 1 (POST): Recibe el problema del alumno desde el formulario y lo guarda en MySQL
app.post('/api/tickets', (req, res) => {
    const { id_usuario, descripcion_problema } = req.body;

    if (!descripcion_problema) {
        return.status(400).json({ error: 'La descripción del problema es obligatoria.' });
    }

    const query = 'INSERT INTO tickets (id_usuario, descripcion_problema, estado) VALUES (?, ?, "Pendiente")';
    
    db.query(query, [id_usuario || 4, descripcion_problema], (err, resultado) => {
        if (err) {
            console.error('Error al guardar el ticket en MySQL:', err);
            return res.status(500).json({ error: 'Error interno en la base de datos.' });
        }

        console.log(`Ticket guardado con ID: ${resultado.insertId}`);
        res.status(201).json({ 
            mensaje: 'Ticket en espera de procesamiento', 
            id_ticket: resultado.insertId 
        });
    });
});

// RUTA 2 (GET): Muestra los tickets cargados para el panel del técnico
app.get('/api/tickets', (req, res) => {
    const query = 'SELECT * FROM tickets ORDER BY fecha_creacion DESC';
    
    db.query(query, (err, resultados) => {
        if (err) {
            console.error('Error al consultar los tickets:', err);
            return res.status(500).json({ error: 'Error al obtener los tickets.' });
        }
        res.status(200).json(resultados);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor listo y corriendo en el puerto ${PORT}`);
});
