// 1. Esperamos a que el HTML cargue por completo en la pantalla
document.addEventListener('DOMContentLoaded', () => {
    
    // 2. Buscamos el formulario por su ID
    const formulario = document.getElementById('form-ticket');

    // 3. Escuchamos cuando el alumno hace clic en "Enviar Reporte"
    formulario.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue y se pierda el texto

        // 4. Capturamos lo que escribió el alumno en el cuadro de texto
        const descripcionTexto = document.getElementById('descripcion').value;

        // 5. Armamos el objeto con los datos (usando el usuario comodín ID 4 para el tótem)
        const nuevoTicket = {
            id_usuario: 4, 
            descripcion_problema: descripcionTexto
        };

        // 6. Mostramos en la consola del navegador lo que vamos a mandar al servidor
        console.log('Preparando para enviar el siguiente ticket:', nuevoTicket);

        // Alerta visual temporal para simular el envío en la escuela
        alert('¡Reporte procesado localmente! Texto capturado: ' + descripcionTexto);

        // 7. Limpiamos el formulario para el próximo alumno
        formulario.reset();
    });
});