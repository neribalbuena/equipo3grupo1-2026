document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('form-ticket');

    if (formulario) {
        formulario.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evita que se recargue la página

            // Capturamos lo que el alumno escribió en el formulario
            const descripcionTexto = document.getElementById('descripcion').value.trim();

            if (!descripcionTexto) {
                alert('Por favor, ingresa una descripción de la falla.');
                return;
            }

            // Creamos el objeto tal cual lo espera nuestro server.js
            const nuevoTicket = {
                id_usuario: 4, // Usuario comodín de la escuela
                descripcion_problema: descripcionTexto
            };

            try {
                // Envío real de datos al backend (Node.js / Express)
                const respuesta = await fetch('http://localhost:3010/api/tickets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nuevoTicket)
                });

                const resultado = await respuesta.json();

                if (respuesta.ok) {
                    alert('¡Ticket registrado con éxito en el sistema!');
                    console.log('Respuesta del servidor:', resultado);
                    formulario.reset(); // Limpia el formulario
                } else {
                    alert('Hubo un error al registrar el ticket: ' + (resultado.mensaje || 'Error desconocido'));
                }

            } catch (error) {
                console.error('Error de conexión con el servidor:', error);
                alert('No se pudo conectar con el servidor local. Verificá que esté encendido.');
            }
        });
    }
});
