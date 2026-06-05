const mysql = require('mysql2'); // Usamos mysql2, que es la dependencia que registramos arriba

// Creamos la conexión con los datos de tu netbook
const db = mysql.createConnection({
    host: 'localhost',   // XAMPP corre local
    user: 'root',        // Usuario root de la escuela
    password: '',        // Sin contraseña
    database: 'ticketera_db' // La DB que creaste la clase pasada
});

// Probamos si la conexión funciona
db.connect((error) => {
    if (error) {
        console.error('⚠️ Error al conectar a la base de datos:', error);
        return;
    }
    console.log('✅ Conexión exitosa a MySQL (ticketera_db)');
});

module.exports = db;