const API_URL = 'https://equipo3grupo1-2026.onrender.com/api';

document.addEventListener('DOMContentLoaded', () => {
    const btnTheme = document.getElementById('btn-theme');
    const formTicket = document.getElementById('form-ticket');
    const contenedorTickets = document.getElementById('contenedor-tickets');
    
    const seccionLogin = document.getElementById('seccion-login');
    const formLogin = document.getElementById('form-login');
    const panelAdmin = document.getElementById('panel-admin');
    const contenedorAdminTickets = document.getElementById('contenedor-admin-tickets');
    const btnLogout = document.getElementById('btn-logout');

    // 1. MODO OSCURO
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        if (btnTheme) btnTheme.textContent = '☀️ Modo Claro';
    }

    btnTheme?.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const esOscuro = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', esOscuro ? 'dark' : 'light');
        btnTheme.textContent = esOscuro ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
    });

    // 2. MOSTRAR REPORTES (VISTA PÚBLICA)
    async function mostrarReportes() {
        if (!contenedorTickets) return;

        try {
            const respuesta = await fetch(`${API_URL}/tickets`);
            if (!respuesta.ok) throw new Error(`Error ${respuesta.status}`);
            const tickets = await respuesta.json();

            contenedorTickets.innerHTML = '';

            if (tickets.length === 0) {
                contenedorTickets.innerHTML = '<p style="color: #888;">No hay reportes registrados.</p>';
                return;
            }

            tickets.forEach((ticket) => {
                const card = document.createElement('div');
                card.className = 'ticket-card';
                card.innerHTML = `
                    <p><strong>Ubicación:</strong> ${ticket.ubicacion}</p>
                    <p><strong>Problema:</strong> ${ticket.descripcion_problema}</p>
                    <p><strong>Estado:</strong> <span style="color: ${ticket.estado === 'Solucionado' ? 'green' : 'orange'};">${ticket.estado || 'Pendiente'}</span></p>
                `;
                contenedorTickets.appendChild(card);
            });

            if (localStorage.getItem('isAdmin') === 'true') {
                renderizarPanelAdmin(tickets);
            }
        } catch (error) {
            console.error('Error al cargar reportes:', error);
            contenedorTickets.innerHTML = '<p style="color: red;">Error al conectar con el servidor.</p>';
        }
    }

    mostrarReportes();

    // 3. REGISTRAR NUEVO TICKET
    formTicket?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const ubicacion = document.getElementById('ubicacion').value;
        const descripcion = document.getElementById('descripcion').value.trim();

        if (!descripcion) return alert('Ingresá una descripción.');

        try {
            const respuesta = await fetch(`${API_URL}/tickets`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ubicacion, descripcion_problema: descripcion })
            });

            if (respuesta.ok) {
                alert('¡Ticket guardado con éxito!');
                formTicket.reset();
                mostrarReportes();
            } else {
                alert('Error al guardar el ticket.');
            }
        } catch (error) {
            console.error('Error de conexión:', error);
        }
    });

    // 4. LOGIN ADMIN
    function verificarSesionAdmin() {
        const esAdmin = localStorage.getItem('isAdmin') === 'true';
        if (esAdmin) {
            if (seccionLogin) seccionLogin.style.display = 'none';
            if (panelAdmin) panelAdmin.style.display = 'block';
            mostrarReportes();
        } else {
            if (seccionLogin) seccionLogin.style.display = 'block';
            if (panelAdmin) panelAdmin.style.display = 'none';
        }
    }

    formLogin?.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('login-user').value.trim();
        const pass = document.getElementById('login-pass').value.trim();

        if (user === 'admin' && pass === '1234') {
            localStorage.setItem('isAdmin', 'true');
            alert('¡Bienvenido Administrador!');
            formLogin.reset();
            verificarSesionAdmin();
        } else {
            alert('Credenciales incorrectas (Usuario: admin / Contraseña: 1234)');
        }
    });

    btnLogout?.addEventListener('click', () => {
        localStorage.removeItem('isAdmin');
        verificarSesionAdmin();
        mostrarReportes();
    });

    // 5. PANEL ADMIN
    function renderizarPanelAdmin(tickets) {
        if (!contenedorAdminTickets) return;
        contenedorAdminTickets.innerHTML = '';

        if (tickets.length === 0) {
            contenedorAdminTickets.innerHTML = '<p style="color: #888;">No hay reportes para gestionar.</p>';
            return;
        }

        tickets.forEach(ticket => {
            const item = document.createElement('div');
            item.className = 'ticket-card';
            item.innerHTML = `
                <p><strong>ID #${ticket.id}</strong> - ${ticket.ubicacion}</p>
                <p><strong>Problema:</strong> ${ticket.descripcion_problema}</p>
                <p><strong>Estado:</strong> <span style="color: ${ticket.estado === 'Solucionado' ? 'green' : 'orange'};">${ticket.estado || 'Pendiente'}</span></p>
                
                <div style="display: flex; gap: 10px; margin-top: 10px;">
                    <button onclick="window.cambiarEstado(${ticket.id}, '${ticket.estado === 'Solucionado' ? 'Pendiente' : 'Solucionado'}')" style="background-color: ${ticket.estado === 'Solucionado' ? '#ffc107' : '#28a745'}; color: white; padding: 6px 10px; font-size: 12px; border-radius: 4px; border: none; cursor: pointer;">
                        ${ticket.estado === 'Solucionado' ? 'Marcar Pendiente' : 'Marcar Solucionado'}
                    </button>
                    
                    <button onclick="window.eliminarTicket(${ticket.id})" style="background-color: #dc3545; color: white; padding: 6px 10px; font-size: 12px; border-radius: 4px; border: none; cursor: pointer;">
                        🗑️ Eliminar
                    </button>
                </div>
            `;
            contenedorAdminTickets.appendChild(item);
        });
    }

    window.cambiarEstado = async function(idTicket, nuevoEstado) {
        try {
            const res = await fetch(`${API_URL}/tickets/${idTicket}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ estado: nuevoEstado })
            });

            if (res.ok) {
                mostrarReportes();
            } else {
                alert('No se pudo actualizar el estado.');
            }
        } catch (err) {
            console.error('Error al actualizar estado:', err);
        }
    };

    window.eliminarTicket = async function(idTicket) {
        if (!confirm(`¿Estás seguro de que querés eliminar el ticket #${idTicket}?`)) return;

        try {
            const res = await fetch(`${API_URL}/tickets/${idTicket}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                mostrarReportes();
            } else {
                alert('No se pudo eliminar el ticket.');
            }
        } catch (err) {
            console.error('Error al eliminar:', err);
        }
    };

    verificarSesionAdmin();
});
