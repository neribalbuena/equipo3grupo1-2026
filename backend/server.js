const express = require('express');
const cors = require('cors');
const db = require('./conexion');

const app = express();
const PORT = process.env.PORT || 3010;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// RUTA (POST): Registro de nuevos tickets desde el tótem
app.post('/api/tickets', (req, res) => {
    const { id_usuario, descripcion_problema } = req.body;

    if (!descripcion_problema) {
        return res.status(400).json({ error: 'La descripción del problema es obligatoria.' });
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

// RUTA (GET): Obtener listado de tickets para el panel técnico
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

// RUTA (POST): Login para el Administrador / Técnico
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña obligatorios.' });
    }

    const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
    
    db.query(query, [email, password], (err, resultados) => {
        if (err) {
            console.error('Error en el servidor al loguear:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (resultados.length > 0) {
            res.status(200).json({ mensaje: 'Login exitoso', usuario: resultados[0] });
        } else {
            res.status(401).json({ error: 'Credenciales incorrectas' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor listo y corriendo en el puerto ${PORT}`);
});
