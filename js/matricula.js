// ======================================
// MATRICULA.JS
// ======================================

document.addEventListener("DOMContentLoaded", () => {
    mostrarEstudiantes();

    const formulario = document.getElementById("frmMatricula");
    formulario.addEventListener("submit", registrarEstudiante);

});

function obtenerEstudiantes() {
    return JSON.parse(localStorage.getItem("estudiantes")) || [];
}

function guardarEstudiantes(estudiantes) {
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
}

function registrarEstudiante(e) {
    e.preventDefault();

    const dni = document.getElementById("dni").value.trim();
    const nombres = document.getElementById("nombres").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const programa = document.getElementById("programa").value;
    const ciclo = document.getElementById("ciclo").value;
    const correo = document.getElementById("correo").value.trim();
    const celular = document.getElementById("celular").value.trim();

    if (!dni || !nombres || !apellidos || !programa || !ciclo || !correo || !celular) {
        alert("Complete todos los campos.");
        return;
    }

    if (!/^\d{8}$/.test(dni)) {
        alert("El DNI debe tener 8 digitos.");
        return;
    }

    if (!/^\d{9}$/.test(celular)) {
        alert("El celular debe tener 9 digitos.");
        return;
    }

    const estudiantes = obtenerEstudiantes();

    if (estudiantes.some(estudiante => estudiante.dni === dni)) {
        alert("Ya existe un estudiante registrado con ese DNI.");
        return;
    }

    const siguienteNumero = Date.now();

    estudiantes.push({
        codigo: "MAT-" + siguienteNumero,
        dni,
        nombres,
        apellidos,
        programa,
        ciclo,
        correo,
        celular
    });

    guardarEstudiantes(estudiantes);
    document.getElementById("frmMatricula").reset();
    mostrarEstudiantes();
    alert("Estudiante registrado correctamente.");
}

function mostrarEstudiantes() {
    const estudiantes = obtenerEstudiantes();
    const tabla = document.getElementById("tablaEstudiantes");

    tabla.innerHTML = "";

    if (estudiantes.length === 0) {
        tabla.innerHTML = `
        <tr>
            <td colspan="9">No existen estudiantes registrados.</td>
        </tr>`;
        return;
    }

    estudiantes.forEach((estudiante, index) => {
        tabla.innerHTML += `
        <tr>
            <td>${estudiante.codigo}</td>
            <td>${estudiante.dni}</td>
            <td>${estudiante.nombres}</td>
            <td>${estudiante.apellidos}</td>
            <td>${estudiante.programa}</td>
            <td>${estudiante.ciclo}</td>
            <td>${estudiante.correo}</td>
            <td>${estudiante.celular}</td>
            <td>
                <button type="button" onclick="editarEstudiante(${index})">Editar</button>
                <button type="button" onclick="eliminarEstudiante(${index})">Eliminar</button>
            </td>
        </tr>`;
    });
}

function eliminarEstudiante(index) {
    if (!confirm("Desea eliminar este estudiante?")) {
        return;
    }

    const estudiantes = obtenerEstudiantes();
    estudiantes.splice(index, 1);
    guardarEstudiantes(estudiantes);
    mostrarEstudiantes();
}

function editarEstudiante(index) {
    const estudiantes = obtenerEstudiantes();
    const estudiante = estudiantes[index];

    document.getElementById("dni").value = estudiante.dni;
    document.getElementById("nombres").value = estudiante.nombres;
    document.getElementById("apellidos").value = estudiante.apellidos;
    document.getElementById("programa").value = estudiante.programa;
    document.getElementById("ciclo").value = estudiante.ciclo;
    document.getElementById("correo").value = estudiante.correo;
    document.getElementById("celular").value = estudiante.celular;

    estudiantes.splice(index, 1);
    guardarEstudiantes(estudiantes);
    mostrarEstudiantes();
}
