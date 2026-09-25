const mysql = require('mysql2')

const conexion = mysql.createConnection({
  host: 'localhost'
  user: 'root',  //tu usuario de MySQL (ej.root)
  password:",  //contraseña
  database: 'sistema_totem'
});

conexion.connect((err) =>{
  if (err) {
    console.error('Error al conectar a la base de datos: ' +
                  err.track);
    return;
  }

                 console.log('Conectado a la base de datos con el ID ' +
                             conexion.threadld);
  });

module.exports = conexion;
