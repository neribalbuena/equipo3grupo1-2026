document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('form-ticket');

    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que se recargue la página

            // Capturamos lo que el alumno escribió en el formulario
            const descripcionTexto = document.getElementById('descripcion').value;

            // Creamos el objeto tal cual lo espera nuestro server.js
            const nuevoTicket = {
                id_usuario: 4, // Usuario comodín de la escuela
                descripcion_problema: descripcionTexto
            };

            console.log('Datos capturados listos para enviar:', nuevoTicket);
            alert('¡Reporte procesado localmente! Problema: ' + descripcionTexto);

            formulario.reset(); // Limpia el formulario
        });
    }
});