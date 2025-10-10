// Base de datos simulada de clientes
const clientesDB = {
    '12345678': {
        nombre: 'Juan Pérez García',
        dni: '12345678',
        telefono: '987654321',
        email: 'juan.perez@email.com',
        plan: 'premium',
        descuento: 10,
        comprasMes: 14
    },
    '87654321': {
        nombre: 'María López Torres',
        dni: '87654321',
        telefono: '912345678',
        email: 'maria.lopez@email.com',
        plan: 'basico',
        descuento: 5,
        comprasMes: 8
    },
    '45678912': {
        nombre: 'Carlos Ruiz Díaz',
        dni: '45678912',
        telefono: '998877665',
        email: 'carlos.ruiz@email.com',
        plan: 'vip',
        descuento: 15,
        comprasMes: 22
    }
};

let clienteActual = null;
let carritoItems = [];

function buscarClientePedido() {
    const dni = document.getElementById('dni-buscar').value.trim();

    if (dni.length !== 8) {
        alert('Por favor ingrese un DNI válido de 8 dígitos');
        return;
    }

    const cliente = clientesDB[dni];

    if (cliente) {
        clienteActual = cliente;
        mostrarInfoCliente(cliente);
    } else {
        alert('Cliente no encontrado. Puede registrarlo como nuevo cliente.');
    }
}

function mostrarInfoCliente(cliente) {
    document.getElementById('cliente-encontrado').classList.remove('hidden');
    document.getElementById('form-nuevo-cliente').classList.add('hidden');

    document.getElementById('nombre-cliente-display').textContent = cliente.nombre;
    document.getElementById('dni-display').textContent = cliente.dni;
    document.getElementById('telefono-display').textContent = cliente.telefono;

    const planBadge = document.getElementById('plan-badge-display');
    let planTexto = 'Sin Plan';
    let badgeClass = 'badge';

    if (cliente.plan === 'basico') {
        planTexto = 'Plan Básico';
        badgeClass = 'badge badge-info';
    } else if (cliente.plan === 'premium') {
        planTexto = 'Plan Premium';
        badgeClass = 'badge badge-success';
    } else if (cliente.plan === 'vip') {
        planTexto = 'Plan VIP';
        badgeClass = 'badge badge-warning';
    }

    planBadge.textContent = planTexto;
    planBadge.className = badgeClass;

    document.getElementById('descuento-display').textContent = cliente.descuento + '%';
    document.getElementById('compras-mes-display').textContent = cliente.comprasMes + ' compras';

    const progreso = Math.min((cliente.comprasMes / 20) * 100, 100);
    document.getElementById('progreso-cliente').style.width = progreso + '%';

    actualizarPreciosConDescuento(cliente.descuento);
}

function actualizarPreciosConDescuento(descuento) {
    if (descuento > 0) {
        const precio1 = 189;
        const precio2 = 259;
        const precio3 = 149;

        document.getElementById('precio-desc-1').textContent = 'S/ ' + (precio1 * (1 - descuento / 100)).toFixed(2);
        document.getElementById('precio-desc-1').classList.remove('hidden');

        document.getElementById('precio-desc-2').textContent = 'S/ ' + (precio2 * (1 - descuento / 100)).toFixed(2);
        document.getElementById('precio-desc-2').classList.remove('hidden');

        document.getElementById('precio-desc-3').textContent = 'S/ ' + (precio3 * (1 - descuento / 100)).toFixed(2);
        document.getElementById('precio-desc-3').classList.remove('hidden');
    }
}

function continuarConCliente() {
    document.getElementById('pedido').classList.remove('hidden');
    document.getElementById('porc-descuento').textContent = clienteActual.descuento;
    window.scrollTo({ top: document.getElementById('pedido').offsetTop - 100, behavior: 'smooth' });
}

function limpiarBusqueda() {
    document.getElementById('dni-buscar').value = '';
    document.getElementById('cliente-encontrado').classList.add('hidden');
    document.getElementById('form-nuevo-cliente').classList.add('hidden');
    clienteActual = null;
    carritoItems = [];
    actualizarCarrito();
}

function mostrarFormularioNuevo() {
    document.getElementById('form-nuevo-cliente').classList.remove('hidden');
    document.getElementById('cliente-encontrado').classList.add('hidden');
    const dniBuscado = document.getElementById('dni-buscar').value;
    if (dniBuscado) {
        document.getElementById('nuevo-dni').value = dniBuscado;
    }
}

function ocultarFormularioNuevo() {
    document.getElementById('form-nuevo-cliente').classList.add('hidden');
}

function mostrarDescuentoPlan() {
    const plan = document.getElementById('nuevo-plan').value;
    const infoDiv = document.getElementById('info-plan');
    const beneficioSpan = document.getElementById('beneficio-plan');

    if (plan === 'ninguno') {
        infoDiv.classList.add('hidden');
    } else {
        infoDiv.classList.remove('hidden');
        let texto = '';
        if (plan === 'basico') texto = '5% de descuento en todas las compras';
        if (plan === 'premium') texto = '10% de descuento en todas las compras';
        if (plan === 'vip') texto = '15% de descuento en todas las compras';
        beneficioSpan.textContent = texto;
    }
}

function registrarNuevoCliente() {
    const nombre = document.getElementById('nuevo-nombre').value.trim();
    const dni = document.getElementById('nuevo-dni').value.trim();
    const telefono = document.getElementById('nuevo-telefono').value.trim();
    const email = document.getElementById('nuevo-email').value.trim();
    const plan = document.getElementById('nuevo-plan').value;

    if (!nombre || !dni || !telefono) {
        alert('Por favor complete todos los campos obligatorios (*)');
        return;
    }

    if (dni.length !== 8) {
        alert('El DNI debe tener 8 dígitos');
        return;
    }

    if (telefono.length !== 9) {
        alert('El teléfono debe tener 9 dígitos');
        return;
    }

    let descuento = 0;
    if (plan === 'basico') descuento = 5;
    if (plan === 'premium') descuento = 10;
    if (plan === 'vip') descuento = 15;

    clienteActual = {
        nombre: nombre,
        dni: dni,
        telefono: telefono,
        email: email,
        plan: plan,
        descuento: descuento,
        comprasMes: 0
    };

    clientesDB[dni] = clienteActual;

    alert('Cliente registrado exitosamente: ' + nombre);

    mostrarInfoCliente(clienteActual);
    document.getElementById('form-nuevo-cliente').classList.add('hidden');
}

function agregarAlCarrito(codigo, nombre, talla, precio, cantidad) {
    if (!clienteActual) {
        alert('Primero debe seleccionar o registrar un cliente');
        return;
    }

    const descuento = clienteActual.descuento || 0;
    const precioConDescuento = precio * (1 - descuento / 100);

    const item = {
        codigo: codigo,
        nombre: nombre,
        talla: talla,
        precio: precio,
        precioConDescuento: precioConDescuento,
        cantidad: cantidad
    };

    carritoItems.push(item);
    actualizarCarrito();
}

function actualizarCarrito() {
    const contenedor = document.getElementById('items-carrito');

    if (carritoItems.length === 0) {
        contenedor.innerHTML = '<p style="color: var(--muted); text-align: center; padding: 20px;">No hay productos en el carrito</p>';
        document.getElementById('subtotal-carrito').textContent = 'S/ 0.00';
        document.getElementById('descuento-carrito').textContent = '- S/ 0.00';
        document.getElementById('total-carrito').textContent = 'S/ 0.00';
        return;
    }

    let html = '';
    let subtotal = 0;
    let totalDescuento = 0;

    carritoItems.forEach((item, index) => {
        subtotal += item.precio * item.cantidad;
        totalDescuento += (item.precio - item.precioConDescuento) * item.cantidad;

        html += `
      <div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.nombre}</div>
          <div class="cart-item-price">
            Talla ${item.talla} | Cant: ${item.cantidad} | 
            <span style="text-decoration: line-through; color: var(--muted);">S/ ${item.precio.toFixed(2)}</span>
            <span style="color: var(--ok); font-weight: 700;">S/ ${item.precioConDescuento.toFixed(2)}</span>
          </div>
        </div>
        <button class="cart-item-remove" onclick="eliminarDelCarrito(${index})">Eliminar</button>
      </div>
    `;
    });

    contenedor.innerHTML = html;

    const total = subtotal - totalDescuento;

    document.getElementById('subtotal-carrito').textContent = 'S/ ' + subtotal.toFixed(2);
    document.getElementById('descuento-carrito').textContent = '- S/ ' + totalDescuento.toFixed(2);
    document.getElementById('total-carrito').textContent = 'S/ ' + total.toFixed(2);
}

function eliminarDelCarrito(index) {
    carritoItems.splice(index, 1);
    actualizarCarrito();
}

function confirmarPedido() {
    if (!clienteActual) {
        alert('Error: No hay cliente seleccionado');
        return;
    }

    if (carritoItems.length === 0) {
        alert('El carrito está vacío. Agregue productos para continuar.');
        return;
    }

    const metodoPago = document.getElementById('metodo-pago').value;
    if (!metodoPago) {
        alert('Por favor seleccione un método de pago');
        return;
    }

    let subtotal = 0;
    let totalDescuento = 0;

    carritoItems.forEach(item => {
        subtotal += item.precio * item.cantidad;
        totalDescuento += (item.precio - item.precioConDescuento) * item.cantidad;
    });

    const total = subtotal - totalDescuento;

    let mensaje = '=== PEDIDO CONFIRMADO ===\n\n';
    mensaje += 'Cliente: ' + clienteActual.nombre + '\n';
    mensaje += 'DNI: ' + clienteActual.dni + '\n';
    mensaje += 'Plan: ' + (clienteActual.plan === 'ninguno' ? 'Sin suscripción' : 'Plan ' + clienteActual.plan) + '\n';
    mensaje += 'Descuento aplicado: ' + clienteActual.descuento + '%\n\n';
    mensaje += '--- PRODUCTOS ---\n';

    carritoItems.forEach(item => {
        mensaje += item.nombre + ' (Talla ' + item.talla + ') x' + item.cantidad + '\n';
    });

    mensaje += '\nSubtotal: S/ ' + subtotal.toFixed(2) + '\n';
    mensaje += 'Descuento: -S/ ' + totalDescuento.toFixed(2) + '\n';
    mensaje += 'TOTAL: S/ ' + total.toFixed(2) + '\n';
    mensaje += 'Método de pago: ' + metodoPago.toUpperCase();

    alert(mensaje);

    carritoItems = [];
    actualizarCarrito();

    if (confirm('¿Desea realizar otro pedido?')) {
        limpiarBusqueda();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        window.location.href = 'main.html';
    }
}