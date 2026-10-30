const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sistema_totem'
});

conexion.connect((err) => {
    if (err) {
        console.error(' Error al conectar con MySQL:', err.message);
        return;
    }
    console.log(' Conectado a la base de datos MySQL con el ID:', conexion.threadId);
});

// Esto evita que la aplicación se rompa con un stack trace gigante si hay un corte
conexion.on('error', (err) => {
    console.error(' Error en la conexión de MySQL:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('La conexión con la base de datos fue cerrada.');
    } else {
        throw err;
    }
});

module.exports = conexion;