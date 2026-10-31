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
    const { ubicacion, descripcion_problema } = req.body;

    if (!descripcion_problema) {
        return res.status(400).json({ error: 'La descripción del problema es obligatoria.' });
    }

    const ubicacionFinal = ubicacion || 'Tótem Principal';
    const query = 'INSERT INTO tickets (ubicacion, descripcion_problema, estado) VALUES (?, ?, "Pendiente")';
    
    db.query(query, [ubicacionFinal, descripcion_problema], (err, resultado) => {
        if (err) {
            console.error('Error al guardar el ticket en MySQL:', err);
            return res.status(500).json({ error: 'Error interno en la base de datos.' });
        }

        console.log(`Ticket guardado con ID: ${resultado.insertId}`);
        res.status(201).json({ 
            mensaje: 'Ticket registrado con éxito', 
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
// RUTA (PATCH): Actualizar estado del ticket
app.patch('/api/tickets/:id', (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    const query = 'UPDATE tickets SET estado = ? WHERE id = ?';
    db.query(query, [estado, id], (err, resultado) => {
        if (err) {
            console.error('Error al actualizar estado:', err);
            return res.status(500).json({ error: 'Error al actualizar el ticket' });
        }
        res.status(200).json({ mensaje: 'Estado actualizado correctamente' });
    });
});

// RUTA (DELETE): Eliminar un ticket
app.delete('/api/tickets/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM tickets WHERE id = ?';
    db.query(query, [id], (err, resultado) => {
        if (err) {
            console.error('Error al eliminar ticket:', err);
            return res.status(500).json({ error: 'Error al eliminar el ticket' });
        }
        res.status(200).json({ mensaje: 'Ticket eliminado correctamente' });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor listo y corriendo en el puerto ${PORT}`);
});
// RUTA (PATCH): Actualizar estado de ticket desde el panel técnico
app.patch('/api/tickets/:id', (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    const query = 'UPDATE tickets SET estado = ? WHERE id = ?';
    db.query(query, [estado, id], (err, resultado) => {
        if (err) {
            console.error('Error al actualizar estado:', err);
            return res.status(500).json({ error: 'Error al actualizar el ticket' });
        }
        res.status(200).json({ mensaje: 'Estado actualizado correctamente' });
    });
});
// RUTA (DELETE): Eliminar un ticket desde el panel admin
app.delete('/api/tickets/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tickets WHERE id = ?';
    db.query(query, [id], (err, resultado) => {
        if (err) {
            console.error('Error al eliminar ticket:', err);
            return res.status(500).json({ error: 'Error al eliminar el ticket' });
        }
        res.status(200).json({ mensaje: 'Ticket eliminado correctamente' });
    });
});