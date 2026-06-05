--1 crear bd de ticketera
CREATE DATABASE IF NOT EXISTS ticketera_db;
USE ticketera_db;
--2 tabla para guardar a los usuarios (Alumnos, profes , etc)
CREATE TABLE IF NOT EXISTS usuarios(
    id_usuario INT AUTO_INCREMENT PRIMARY_KEY,
    nombre VARCHAR (50) NOT NULL,
    apellido VARCHAR (50) NOT NULL,
    rol VARCHAR (20) DEFAULT 'alumno' --puede ser alumno, profe u otro
)

--3 tabla para los tickets
CREATE TABLE IF NOT EXISTS tickets (
    id_ticket INT AUTO_INCREMENT PRIMARY_KEY,
    id_usuario INT,
    descripcion_problema TEXT NOT NULL,
    estado VARCHAR(20) DEFAULT 'pendiente',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
)
--4 eso es para probar con datos de prueba
INSERT INTO usuarios (nombre, apellido, rol) VALUES
('Neri', 'Balbuena', 'alumno'),
('Tomas', 'Burgos', 'Alumno'),
('Magui', 'Barrientos', 'Alumno')
('Terminal', 'Publica', 'tecnico'); --usuario "COMODIN" para la máquina fija

INSERT INTO tickets (id_usuario, descripcion_problema) VALUES
(4, 'Netbook numero 5 de jefatura bloqueada.'),
(4, 'Sistema operativo falla en computadora 9');