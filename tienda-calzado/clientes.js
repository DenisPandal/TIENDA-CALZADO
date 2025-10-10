function buscarClientes() {
    const dni = document.getElementById('buscar-dni').value.trim();
    const nombre = document.getElementById('buscar-nombre').value.trim().toLowerCase();
    const plan = document.getElementById('filtrar-plan').value;

    alert('Búsqueda:\nDNI: ' + (dni || 'Todos') + '\nNombre: ' + (nombre || 'Todos') + '\nPlan: ' + (plan || 'Todos'));
}

function limpiarBusqueda() {
    document.getElementById('buscar-dni').value = '';
    document.getElementById('buscar-nombre').value = '';
    document.getElementById('filtrar-plan').value = '';
    alert('Filtros limpiados. Mostrando todos los clientes.');
}