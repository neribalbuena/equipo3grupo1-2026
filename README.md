# equipo3grupo1-2026
Algunas notebooks de la escuela tienen fallas y alumnos y profesores no tienen un canal formal de avisar esto, Entonces este proyecto trata de un software donde cualquier usuario de la escuela pueda reportar una falla en una máquina específica. Luego guardar esos tickets y tener un conteo de los problemas a solucionar


De qué trata nuestro proyecto?
​La idea de la Ticketera nació para solucionar un problema típico de la escuela: cuando a un alumno se le rompe, se le bloquea o se le queda sin Wi-Fi la netbook, el proceso para avisar a los técnicos suele ser un lío o se pierde en el camino.
​Para arreglar esto, vamos a armar un Tótem (una terminal pública) usando una netbook fija en la escuela. Cualquier persona que tenga un problema con su máquina se va a poder acercar, escribir rápido qué le pasa en una pantalla simple con botones grandes, y enviar el reporte. Ese "ticket" le llega automáticamente al equipo técnico para que sepan qué revisar.
​¿Cómo lo estamos programando y qué usamos?
​Dividimos el sistema en tres partes para que sea ordenado:
​La pantalla que se ve (Frontend): Usamos HTML para armar la estructura del formulario, CSS para que quede prolijo y cómodo de usar en el tótem, y JavaScript para capturar lo que escribe el alumno cuando aprieta el botón de enviar.
​El servidor (Backend): Usamos Node.js con Express. Esto es el motor que está "atrás" de la pantalla; recibe el texto que mandó el alumno y lo procesa para que no se pierda.
​El almacenamiento (Base de Datos): Usamos MySQL para guardar todas las tablas del sistema: quién reporta, la descripción de la falla y si el problema ya se solucionó o sigue pendiente.
​¿Cómo trabajamos en grupo?
​Para no pisarnos con el código, usamos Git y GitHub. Cada uno trabaja en su parte (por ejemplo, en la rama del backend) y después juntamos todo. Además, nos organizamos con un Diagrama de GANTT para repartirnos qué hace cada uno día a día y llegar bien con las fechas antes de que termine el año


De qué trata nuestro proyecto?
​La idea de la Ticketera nació para solucionar un problema típico de la escuela: cuando a un alumno se le rompe, se le bloquea o se le queda sin Wi-Fi la netbook, el proceso para avisar a los técnicos suele ser un lío o se pierde en el camino.
​Para arreglar esto, vamos a armar un Tótem (una terminal pública) usando una netbook fija en la escuela. Cualquier persona que tenga un problema con su máquina se va a poder acercar, escribir rápido qué le pasa en una pantalla simple con botones grandes, y enviar el reporte. Ese "ticket" le llega automáticamente al equipo técnico para que sepan qué revisar.
​¿Cómo lo estamos programando y qué usamos?
​Dividimos el sistema en tres partes para que sea ordenado
​Planificación (GANTT y Curva S): Ya tenemos armados los gráficos del GANTT y la Curva S. Nos sirve para dividirnos las tareas entre nosotros, organizarnos día a día y ver que hoy estamos en un 20% del proyecto total, al día con las fechas.
​La Base de Datos (MySQL): Ya la programamos en limpio con las tablas para guardar los usuarios, los problemas y el estado de cada ticket. Dejamos un usuario "comodín" listo para que use la máquina de la escuela.
​El Servidor (Node.js): Dejamos creado el package.json y el archivo conexion.js listo para que se conecte a la base de datos local ni bien configuremos el entorno.
​El Formulario (HTML, CSS y JS): Ya diseñamos la pantalla visual del formulario con botones cómodos. Le metimos JavaScript para que, cuando tocas el botón, capture el texto que escribió el alumno, salte una alerta y quede listo para mandar al servidor.
​¿Qué falta? Instalar Node en la netbook para bajar Express, conectar la pantalla con la base de datos real usando fetch, y probarlo con los chicos en el colegio
