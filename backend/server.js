const express = require('express');
const db = require('./conexion'); // Trae la conexion a MySQL de conexion.js
const app = express();
const PORT = 3000;

// Permite que el servidor entienda datos en formato JSON y de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// RUTA 1 (POST): Recibe el problema del alumno desde el formulario
app.post('/api/tickets', (req, res) => {
    const { id_usuario, descripcion_problema } = req.body;
    console.log(`Ticket recibido del usuario ${id_usuario}: ${descripcion_problema}`);
    res.status(200).json({ mensaje: "Ticket en espera de procesamiento" });
});

// RUTA 2 (GET) q Muestra los tickets cargados para el panel del técnico
app.get('/api/tickets', (req, res) => {
    res.json({ mensaje: "Lista de tickets cargados (Simulado)" });
});

app.listen(PORT, () => {
    console.log(` Servidor listo en el puerto ${PORT}`);
});