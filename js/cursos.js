// =====================================
// CURSOS.JS
// =====================================

document.addEventListener("DOMContentLoaded", () => {
    mostrarCursos();

    const formulario = document.getElementById("frmCursos");
    formulario.addEventListener("submit", registrarCurso);

});

function obtenerCursos() {
    return JSON.parse(localStorage.getItem("cursos")) || [];
}

function guardarCursos(cursos) {
    localStorage.setItem("cursos", JSON.stringify(cursos));
}

function registrarCurso(e) {
    e.preventDefault();

    const codigo = document.getElementById("codigo").value.trim().toUpperCase();
    const nombre = document.getElementById("nombre").value;
    const creditos = document.getElementById("creditos").value;
    const costo = document.getElementById("costo").value;

    if (!codigo || !nombre || !creditos || !costo) {
        alert("Complete todos los campos.");
        return;
    }

    if (Number(creditos) <= 0 || Number(costo) < 0) {
        alert("Ingrese creditos y costo validos.");
        return;
    }

    const cursos = obtenerCursos();

    if (cursos.some(curso => curso.codigo === codigo)) {
        alert("Ya existe un curso con ese codigo.");
        return;
    }

    cursos.push({
        codigo,
        nombre,
        creditos,
        costo
    });

    guardarCursos(cursos);
    document.getElementById("frmCursos").reset();
    mostrarCursos();
    alert("Curso registrado correctamente.");
}

function mostrarCursos() {
    const cursos = obtenerCursos();
    const tabla = document.getElementById("tablaCursos");

    tabla.innerHTML = "";

    if (cursos.length === 0) {
        tabla.innerHTML = `
        <tr>
            <td colspan="5">No existen cursos registrados.</td>
        </tr>`;
        return;
    }

    cursos.forEach((curso, index) => {
        tabla.innerHTML += `
        <tr>
            <td>${curso.codigo}</td>
            <td>${curso.nombre}</td>
            <td>${curso.creditos}</td>
            <td>S/ ${Number(curso.costo).toFixed(2)}</td>
            <td>
                <button type="button" class="editar" onclick="editarCurso(${index})">Editar</button>
                <button type="button" class="eliminar" onclick="eliminarCurso(${index})">Eliminar</button>
            </td>
        </tr>`;
    });
}

function eliminarCurso(index) {
    if (!confirm("Desea eliminar este curso?")) {
        return;
    }

    const cursos = obtenerCursos();
    cursos.splice(index, 1);
    guardarCursos(cursos);
    mostrarCursos();
}

function editarCurso(index) {
    const cursos = obtenerCursos();
    const curso = cursos[index];

    document.getElementById("codigo").value = curso.codigo;
    document.getElementById("nombre").value = curso.nombre;
    document.getElementById("creditos").value = curso.creditos;
    document.getElementById("costo").value = curso.costo;

    cursos.splice(index, 1);
    guardarCursos(cursos);
    mostrarCursos();
}
