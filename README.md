# equipo3grupo1-2026 -project manager: Balbuena
Algunas notebooks de la escuela tienen fallas y alumnos y profesores no tienen un canal formal de avisar esto, Entonces este proyecto trata de un software donde cualquier usuario de la escuela pueda reportar una falla en una máquina específica. Luego guardar esos tickets y tener un conteo de los problemas a solucionar


## Hito 2 - Alcance y Requerimientos (3 de Julio)

### 1. Alcance del Proyecto
* **Lo que SÍ hace:** Formulario web para reportar fallas en un tótem público, guardado local en MySQL acoplado a un usuario comodín (ID 4), y cambio de estado de tickets por el técnico.
* **Lo que NO hace:** No maneja aplicación para celulares ni envía correos automáticos.

### 2. Requerimientos Funcionales
* El sistema debe validar que el campo de texto de la falla no se envíe vacío.
* Los reportes se deben guardar de forma persistente en la base de datos local.
* El usuario técnico debe poder actualizar los estados de los tickets ("Pendiente", "En Proceso", "Solucionado").

### 3. Requerimientos No Funcionales
* Interfaz limpia y cómoda para uso rápido en los recreos.
* Servidor corriendo localmente con Node.js, Express y XAMPP.
* Gestión de equipo mediante control de versiones en GitHub.

### 4. Curva S Actualizada
* **Avance real actual:** ~20% del total.
* Ya contamos con la base de datos estructurada, la conexión inicial programada y el frontend capturando datos con JavaScript. El proyecto marcha al día.
*