// =====================================
// PAGOS.JS
// =====================================

document.addEventListener("DOMContentLoaded", () => {
    mostrarPagos();

    const destino = document.getElementById("destino");
    const formulario = document.getElementById("frmPagos");

    destino.addEventListener("change", calcularPago);
    formulario.addEventListener("submit", registrarPago);
    formulario.addEventListener("reset", limpiarCalculos);

});

function obtenerPagos() {
    return JSON.parse(localStorage.getItem("pagos")) || [];
}

function guardarPagos(pagos) {
    localStorage.setItem("pagos", JSON.stringify(pagos));
}

function limpiarCalculos() {
    setTimeout(() => {
        document.getElementById("precioBase").value = "";
        document.getElementById("subtotal").value = "";
        document.getElementById("igv").value = "";
        document.getElementById("total").value = "";
    }, 0);
}

function calcularPago() {
    const precioBase = Number(document.getElementById("destino").value);

    if (!precioBase) {
        document.getElementById("precioBase").value = "";
        document.getElementById("subtotal").value = "";
        document.getElementById("igv").value = "";
        document.getElementById("total").value = "";
        return;
    }

    const subtotal = precioBase;
    const igv = subtotal * 0.18;
    const total = subtotal + igv;

    document.getElementById("precioBase").value = precioBase.toFixed(2);
    document.getElementById("subtotal").value = subtotal.toFixed(2);
    document.getElementById("igv").value = igv.toFixed(2);
    document.getElementById("total").value = total.toFixed(2);
}

function registrarPago(e) {
    e.preventDefault();

    const dni = document.getElementById("dni").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const destinoSelect = document.getElementById("destino");
    const destino = destinoSelect.options[destinoSelect.selectedIndex].text;
    const precioBase = document.getElementById("precioBase").value;
    const subtotal = document.getElementById("subtotal").value;
    const igv = document.getElementById("igv").value;
    const total = document.getElementById("total").value;

    if (!dni || !nombre || !destinoSelect.value || !precioBase || !subtotal || !igv || !total) {
        alert("Complete todos los campos y seleccione un destino.");
        return;
    }

    if (!/^\d{8}$/.test(dni)) {
        alert("El DNI debe tener 8 digitos.");
        return;
    }

    const pagos = obtenerPagos();

    pagos.push({
        codigo: "PAG-" + Date.now(),
        dni,
        nombre,
        destino,
        precioBase,
        subtotal,
        igv,
        total
    });

    guardarPagos(pagos);
    document.getElementById("frmPagos").reset();
    limpiarCalculos();
    mostrarPagos();
    alert("Pago registrado correctamente.");
}

function mostrarPagos() {
    const pagos = obtenerPagos();
    const tabla = document.getElementById("tablaPagos");

    tabla.innerHTML = "";

    if (pagos.length === 0) {
        tabla.innerHTML = `
        <tr>
            <td colspan="8">No existen pagos registrados.</td>
        </tr>`;
        return;
    }

    pagos.forEach((pago, index) => {
        tabla.innerHTML += `
        <tr>
            <td>${pago.dni}</td>
            <td>${pago.nombre}</td>
            <td>${pago.destino}</td>
            <td>S/ ${Number(pago.precioBase).toFixed(2)}</td>
            <td>S/ ${Number(pago.subtotal).toFixed(2)}</td>
            <td>S/ ${Number(pago.igv).toFixed(2)}</td>
            <td>S/ ${Number(pago.total).toFixed(2)}</td>
            <td>
                <button type="button" class="editar" onclick="editarPago(${index})">Editar</button>
                <button type="button" class="eliminar" onclick="eliminarPago(${index})">Eliminar</button>
            </td>
        </tr>`;
    });
}

function editarPago(index) {
    const pagos = obtenerPagos();
    const pago = pagos[index];
    const destinoSelect = document.getElementById("destino");

    document.getElementById("dni").value = pago.dni;
    document.getElementById("nombre").value = pago.nombre;

    for (let i = 0; i < destinoSelect.options.length; i++) {
        if (destinoSelect.options[i].text === pago.destino) {
            destinoSelect.selectedIndex = i;
            break;
        }
    }

    calcularPago();
    pagos.splice(index, 1);
    guardarPagos(pagos);
    mostrarPagos();
}

function eliminarPago(index) {
    if (!confirm("Desea eliminar este pago?")) {
        return;
    }

    const pagos = obtenerPagos();
    pagos.splice(index, 1);
    guardarPagos(pagos);
    mostrarPagos();
}
