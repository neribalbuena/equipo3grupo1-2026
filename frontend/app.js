document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('form-ticket');
    const contenedorTickets = document.getElementById('contenedor-tickets');

    // Función para mostrar la lista de elementos y sus botones de acción
    function mostrarReportes() {
        const tickets = JSON.parse(localStorage.getItem('tickets_escuela')) || [];
        contenedorTickets.innerHTML = '';

        if (tickets.length === 0) {
            contenedorTickets.innerHTML = '<p style="color: #888;">No hay reportes cargados aún.</p>';
            return;
        }

        tickets.forEach((ticket, index) => {
            const card = document.createElement('div');
            card.className = `ticket-card ${ticket.reparado ? 'reparado' : ''}`;
            
            card.innerHTML = `
                <p><strong>Tipo:</strong> ${ticket.tipo}</p>
                <p class="texto-descripcion"><strong>Descripción:</strong> ${ticket.descripcion}</p>
                <p style="font-size: 11px; color: #888; margin-top: 5px;">Fecha: ${ticket.fecha}</p>
                <div class="acciones-tarjeta">
                    <button class="btn-accion btn-estado" onclick="cambiarEstado(${index})">
                        ${ticket.reparado ? 'Marcar Pendiente' : 'Marcar Reparado'}
                    </button>
                    <button class="btn-accion btn-eliminar" onclick="eliminarTicket(${index})">Eliminar</button>
                </div>
            `;
            contenedorTickets.appendChild(card);
        });
    }

    // Cargar la lista al abrir la página
    mostrarReportes();

    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();

            const tipoElemento = document.getElementById('tipo-elemento').value;
            const descripcionTexto = document.getElementById('descripcion').value.trim();

            if (!descripcionTexto) {
                alert('Por favor, ingresa una descripción de la falla.');
                return;
            }

            const nuevoTicket = {
                tipo: tipoElemento,
                descripcion: descripcionTexto,
                fecha: new Date().toLocaleString(),
                reparado: false // Empieza como no reparado por defecto
            };

            let tickets = JSON.parse(localStorage.getItem('tickets_escuela')) || [];
            tickets.unshift(nuevoTicket);
            localStorage.setItem('tickets_escuela', JSON.stringify(tickets));

            formulario.reset();
            mostrarReportes();
        });
    }
});

// Funciones globales para que los botones interactúen con el localStorage
window.cambiarEstado = function(index) {
    let tickets = JSON.parse(localStorage.getItem('tickets_escuela')) || [];
    tickets[index].reparado = !tickets[index].reparado; // Alterna entre true y false
    localStorage.setItem('tickets_escuela', JSON.stringify(tickets));
    
    // Recargamos la lista visualmente
    const evento = new Event('DOMContentLoaded');
    document.dispatchEvent(evento);
    location.reload(); // Recarga rápida para actualizar la vista de forma segura
};

window.eliminarTicket = function(index) {
    if (confirm('¿Estás seguro de que deseas eliminar este reporte?')) {
        let tickets = JSON.parse(localStorage.getItem('tickets_escuela')) || [];
        tickets.splice(index, 1); // Borra el elemento seleccionado de la lista
        localStorage.setItem('tickets_escuela', JSON.stringify(tickets));
        location.reload();
    }
};

