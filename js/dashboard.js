// =====================================
// DASHBOARD.JS
// Sistema Web de Matrícula IESTP Recuay
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    cargarDashboard();
});

// =====================================
// CARGAR DASHBOARD
// =====================================

function cargarDashboard() {
    mostrarEstadisticas();
    mostrarTabla();
}

// =====================================
// MOSTRAR ESTADÍSTICAS
// =====================================

function mostrarEstadisticas() {

    let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
    let pagos = JSON.parse(localStorage.getItem("pagos")) || [];

    document.getElementById("totalEstudiantes").textContent = estudiantes.length;
    document.getElementById("totalCursos").textContent = 6;
    document.getElementById("totalMatriculas").textContent = estudiantes.length;

    let monto = 0;

    for (let i = 0; i < pagos.length; i++) {
        monto += Number(pagos[i].total);
    }

    document.getElementById("montoRecaudado").textContent =
        "S/ " + monto.toFixed(2);
}

// =====================================
// MOSTRAR TABLA
// =====================================

function mostrarTabla() {

    let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
    let tabla = document.getElementById("tablaEstudiantes");

    tabla.innerHTML = "";

    if (estudiantes.length === 0) {
        tabla.innerHTML = `
            <tr>
                <td colspan="5">No existen estudiantes registrados.</td>
            </tr>
        `;
        return;
    }

    estudiantes.forEach(estudiante => {
        tabla.innerHTML += `
            <tr>
                <td>${estudiante.codigo}</td>
                <td>${estudiante.dni}</td>
                <td>${estudiante.nombres} ${estudiante.apellidos}</td>
                <td>${estudiante.programa}</td>
                <td>${estudiante.ciclo}</td>
            </tr>
        `;
    });
}

// =====================================
// ACTUALIZAR DASHBOARD
// =====================================

function actualizarDashboard() {
    mostrarEstadisticas();
    mostrarTabla();
}

// =====================================
// AUTO REFRESH
// =====================================

setInterval(actualizarDashboard, 5000);

// =====================================
// CERRAR SESIÓN
// =====================================

function salir() {
    if (confirm("¿Desea cerrar sesión?")) {
        window.location.href = "login.html";
    }
}

// =====================================
// MENÚ RESPONSIVE (CORREGIDO)
// =====================================

