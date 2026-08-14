document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('form-ticket');
    const contenedorTickets = document.getElementById('contenedor-tickets');

    // Función para mostrar la lista de elementos rotos guardados en localStorage
    function mostrarReportes() {
        const tickets = JSON.parse(localStorage.getItem('tickets_escuela')) || [];
        contenedorTickets.innerHTML = '';

        if (tickets.length === 0) {
            contenedorTickets.innerHTML = '<p style="color: #888;">No hay reportes cargados aún.</p>';
            return;
        }

        tickets.forEach((ticket, index) => {
            const card = document.createElement('div');
            card.className = 'ticket-card';
            card.innerHTML = `
                <p><strong>Tipo:</strong> ${ticket.tipo}</p>
                <p><strong>Descripción:</strong> ${ticket.descripcion}</p>
                <p style="font-size: 11px; color: #888; margin-top: 5px;">Fecha: ${ticket.fecha}</p>
            `;
            contenedorTickets.appendChild(card);
        });
    }

    // Cargar la lista al abrir la página
    mostrarReportes();

    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que se recargue la página

            const tipoElemento = document.getElementById('tipo-elemento').value;
            const descripcionTexto = document.getElementById('descripcion').value.trim();

            if (!descripcionTexto) {
                alert('Por favor, ingresa una descripción de la falla.');
                return;
            }

            // Crear el objeto con lo que se rompió
            const nuevoTicket = {
                tipo: tipoElemento,
                descripcion: descripcionTexto,
                fecha: new Date().toLocaleString()
            };

            // Guardar estrictamente en el localStorage del navegador
            let tickets = JSON.parse(localStorage.getItem('tickets_escuela')) || [];
            tickets.unshift(nuevoTicket);
            localStorage.setItem('tickets_escuela', JSON.stringify(tickets));

            alert('¡Reporte guardado con éxito en el almacenamiento local!');
            formulario.reset();
            
            // Actualizar la lista visualmente al instante
            mostrarReportes();
        });
    }
});
