CREATE DATABASE IF NOT EXISTS sistema_totem;
USE sistema_totem;

CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY
  nombre VARCHAR(50) NOT NULL
  );

INSERT INTO roles (nombre) VALUES ('Administrador'),
('Tecnico'), ('Usuario Comodin');

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  id_rol INT,
  FOREIGN KEY (id_rol) REFERENCES roles(id)
  );

INSERT INTO usuarios (id, nombre, email, id_rol) VALUES
(4,'Usuario Comodin Totem', 'totem@gmail.com', 3);

CREATE TABLE IF NOT EXISTS equipos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo_elemento VARCHAR(100) NOT NULL,
  descripcion_ubicacion VARCHAR(150)
  );

CREATE TABLE IF NOT EXISTS tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  descricion_problema TEXT NOT NULL,
  estado VARCHAR(50) DEFAULT'Pendiente', --Estados;
  Pendiente, En Proceso, Solucionado
  reparado BOOLEAN DEFAULT FALSE,
  fecha_creacion TIMESTAMP DEFAULT
  CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
  );
  

