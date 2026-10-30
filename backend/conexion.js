const { Pool } = require('pg');

const conexion = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

conexion.connect((err, client, release) => {
    if (err) {
        return console.error('Error al conectar con la base de datos:', err.stack);
    }
    console.log('Conectado exitosamente a la base de datos en Supabase (PostgreSQL)');
    release();
});

module.exports = conexion;
