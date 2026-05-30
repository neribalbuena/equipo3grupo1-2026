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
CREATE TABLE IF NOT EXISTS tickets