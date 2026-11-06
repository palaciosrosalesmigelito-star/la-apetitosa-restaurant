// =====================================
// REPORTES.JS
// =====================================

document.addEventListener("DOMContentLoaded", () => {
    cargarReportes();

    document.getElementById("btnBuscar").addEventListener("click", buscarReporte);
    document.getElementById("buscar").addEventListener("keyup", buscarReporte);
    document.getElementById("btnPDF").addEventListener("click", descargarPDF);
    document.getElementById("btnExcel").addEventListener("click", descargarExcel);
    document.getElementById("btnImprimir").addEventListener("click", () => window.print());
});

function leerLista(clave) {
    return JSON.parse(localStorage.getItem(clave)) || [];
}

function guardarLista(clave, lista) {
    localStorage.setItem(clave, JSON.stringify(lista));
}

function obtenerRegistrosReporte() {
    const estudiantes = leerLista("estudiantes");
    const cursos = leerLista("cursos");
    const pagos = leerLista("pagos");
    const registros = [];

    estudiantes.forEach((estudiante, indice) => {
        registros.push({
            modulo: "Matricula",
            tipo: "Estudiante",
            clave: "estudiantes",
            indice,
            codigo: estudiante.dni,
            nombre: `${estudiante.nombres} ${estudiante.apellidos}`,
            descripcion: `Programa: ${estudiante.programa} - Ciclo ${estudiante.ciclo}`,
            estado: "Registrado"
        });
    });

    cursos.forEach((curso, indice) => {
        registros.push({
            modulo: "Cursos",
            tipo: "Curso",
            clave: "cursos",
            indice,
            codigo: curso.codigo,
            nombre: curso.nombre,
            descripcion: `Creditos: ${curso.creditos} - Costo: S/ ${Number(curso.costo).toFixed(2)}`,
            estado: "Disponible"
        });
    });

    pagos.forEach((pago, indice) => {
        registros.push({
            modulo: "Pagos",
            tipo: "Pago",
            clave: "pagos",
            indice,
            codigo: pago.dni,
            nombre: pago.nombre,
            descripcion: `Destino: ${pago.destino} - Total: S/ ${Number(pago.total).toFixed(2)}`,
            estado: "Pagado"
        });
    });

    return registros;
}

function cargarReportes() {
    const tabla = document.getElementById("tablaReportes");
    const registros = obtenerRegistrosReporte();

    tabla.innerHTML = "";

    if (registros.length === 0) {
        tabla.innerHTML = `
        <tr>
            <td colspan="7">No existen registros.</td>
        </tr>`;
        return;
    }

    registros.forEach(registro => {
        tabla.innerHTML += `
        <tr>
            <td>${registro.modulo}</td>
            <td>${registro.tipo}</td>
            <td>${registro.codigo}</td>
            <td>${registro.nombre}</td>
            <td>${registro.descripcion}</td>
            <td>${registro.estado}</td>
            <td class="acciones-tabla">
                <button type="button" class="editar" onclick="editarReporte('${registro.clave}', ${registro.indice})">Editar</button>
                <button type="button" class="eliminar" onclick="eliminarReporte('${registro.clave}', ${registro.indice})">Eliminar</button>
            </td>
        </tr>`;
    });
}

function buscarReporte() {
    const texto = document.getElementById("buscar").value.toLowerCase();
    const filas = document.querySelectorAll("#tablaReportes tr");

    filas.forEach(fila => {
        fila.style.display = fila.textContent.toLowerCase().includes(texto) ? "" : "none";
    });
}

function pedirValor(mensaje, valorActual) {
    const valor = prompt(mensaje, valorActual || "");
    return valor === null ? null : valor.trim();
}

function eliminarReporte(clave, indice) {
    if (!confirm("Desea eliminar este registro del modulo correspondiente?")) {
        return;
    }

    const lista = leerLista(clave);
    lista.splice(indice, 1);
    guardarLista(clave, lista);
    cargarReportes();
    buscarReporte();
}

function editarReporte(clave, indice) {
    if (clave === "estudiantes") {
        editarEstudianteReporte(indice);
    }

    if (clave === "cursos") {
        editarCursoReporte(indice);
    }

    if (clave === "pagos") {
        editarPagoReporte(indice);
    }
}

function editarEstudianteReporte(indice) {
    const estudiantes = leerLista("estudiantes");
    const estudiante = estudiantes[indice];

    const dni = pedirValor("DNI del estudiante:", estudiante.dni);
    if (dni === null) return;

    const nombres = pedirValor("Nombres del estudiante:", estudiante.nombres);
    if (nombres === null) return;

    const apellidos = pedirValor("Apellidos del estudiante:", estudiante.apellidos);
    if (apellidos === null) return;

    const programa = pedirValor("Programa de estudios:", estudiante.programa);
    if (programa === null) return;

    const ciclo = pedirValor("Ciclo:", estudiante.ciclo);
    if (ciclo === null) return;

    const correo = pedirValor("Correo:", estudiante.correo);
    if (correo === null) return;

    const celular = pedirValor("Celular:", estudiante.celular);
    if (celular === null) return;

    if (!/^\d{8}$/.test(dni)) {
        alert("El DNI debe tener 8 digitos.");
        return;
    }

    if (estudiantes.some((item, i) => item.dni === dni && i !== indice)) {
        alert("Ya existe otro estudiante con ese DNI.");
        return;
    }

    estudiantes[indice] = {
        ...estudiante,
        dni,
        nombres,
        apellidos,
        programa,
        ciclo,
        correo,
        celular
    };

    guardarLista("estudiantes", estudiantes);
    cargarReportes();
    buscarReporte();
}

function editarCursoReporte(indice) {
    const cursos = leerLista("cursos");
    const curso = cursos[indice];

    const codigo = pedirValor("Codigo del curso:", curso.codigo);
    if (codigo === null) return;

    const nombre = pedirValor("Nombre del curso:", curso.nombre);
    if (nombre === null) return;

    const creditos = pedirValor("Creditos:", curso.creditos);
    if (creditos === null) return;

    const costo = pedirValor("Costo:", curso.costo);
    if (costo === null) return;

    if (!codigo || !nombre || Number(creditos) <= 0 || Number(costo) < 0) {
        alert("Ingrese datos validos para el curso.");
        return;
    }

    if (cursos.some((item, i) => item.codigo === codigo.toUpperCase() && i !== indice)) {
        alert("Ya existe otro curso con ese codigo.");
        return;
    }

    cursos[indice] = {
        codigo: codigo.toUpperCase(),
        nombre,
        creditos,
        costo
    };

    guardarLista("cursos", cursos);
    cargarReportes();
    buscarReporte();
}

function editarPagoReporte(indice) {
    const pagos = leerLista("pagos");
    const pago = pagos[indice];

    const dni = pedirValor("DNI del estudiante:", pago.dni);
    if (dni === null) return;

    const nombre = pedirValor("Nombre del estudiante:", pago.nombre);
    if (nombre === null) return;

    const destino = pedirValor("Destino:", pago.destino);
    if (destino === null) return;

    const precioBase = pedirValor("Precio base:", pago.precioBase);
    if (precioBase === null) return;

    if (!/^\d{8}$/.test(dni) || !nombre || !destino || Number(precioBase) <= 0) {
        alert("Ingrese datos validos para el pago.");
        return;
    }

    const subtotal = Number(precioBase);
    const igv = subtotal * 0.18;
    const total = subtotal + igv;

    pagos[indice] = {
        ...pago,
        dni,
        nombre,
        destino,
        precioBase: subtotal.toFixed(2),
        subtotal: subtotal.toFixed(2),
        igv: igv.toFixed(2),
        total: total.toFixed(2)
    };

    guardarLista("pagos", pagos);
    cargarReportes();
    buscarReporte();
}

function crearContenidoPDF(registros) {
    const fecha = new Date().toLocaleString("es-PE");
    const lineas = [
        "Reporte del Sistema de Matricula",
        "IESTP Recuay",
        "Fecha: " + fecha,
        "",
        "Modulo | Tipo | Codigo/DNI | Nombre | Descripcion | Estado",
        "------------------------------------------------------------"
    ];

    if (registros.length === 0) {
        lineas.push("No existen registros.");
    } else {
        registros.forEach(registro => {
            lineas.push(`${registro.modulo} | ${registro.tipo} | ${registro.codigo} | ${registro.nombre} | ${registro.descripcion} | ${registro.estado}`);
        });
    }

    return lineas;
}

function limpiarTextoPDF(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\x20-\x7E]/g, "");
}

function escaparPDF(texto) {
    return limpiarTextoPDF(texto)
        .replace(/\\/g, "\\\\")
        .replace(/\(/g, "\\(")
        .replace(/\)/g, "\\)");
}

function descargarPDF() {
    const registros = obtenerRegistrosReporte();
    const lineas = crearContenidoPDF(registros);
    const paginas = [];
    const lineasPorPagina = 34;

    for (let i = 0; i < lineas.length; i += lineasPorPagina) {
        paginas.push(lineas.slice(i, i + lineasPorPagina));
    }

    const objetos = [];
    const paginasIds = [];

    objetos.push("<< /Type /Catalog /Pages 2 0 R >>");
    objetos.push("");

    paginas.forEach((pagina, index) => {
        const pageId = 3 + index * 2;
        const contentId = pageId + 1;
        paginasIds.push(pageId);

        const contenido = [
            "BT",
            "/F1 11 Tf",
            "50 790 Td",
            "14 TL",
            ...pagina.map(linea => `(${escaparPDF(linea.substring(0, 105))}) Tj T*`),
            "ET"
        ].join("\n");

        objetos.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> /Contents ${contentId} 0 R >>`);
        objetos.push(`<< /Length ${contenido.length} >>\nstream\n${contenido}\nendstream`);
    });

    objetos[1] = `<< /Type /Pages /Kids [${paginasIds.map(id => `${id} 0 R`).join(" ")}] /Count ${paginasIds.length} >>`;

    let pdf = "%PDF-1.4\n";
    const offsets = [0];

    objetos.forEach((objeto, index) => {
        offsets.push(pdf.length);
        pdf += `${index + 1} 0 obj\n${objeto}\nendobj\n`;
    });

    const inicioXref = pdf.length;
    pdf += `xref\n0 ${objetos.length + 1}\n`;
    pdf += "0000000000 65535 f \n";

    for (let i = 1; i < offsets.length; i++) {
        pdf += String(offsets[i]).padStart(10, "0") + " 00000 n \n";
    }

    pdf += `trailer\n<< /Size ${objetos.length + 1} /Root 1 0 R >>\nstartxref\n${inicioXref}\n%%EOF`;

    const blob = new Blob([pdf], { type: "application/pdf" });
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = "reporte-sistema.pdf";
    enlace.click();
    URL.revokeObjectURL(enlace.href);
}

function descargarExcel() {
    const registros = obtenerRegistrosReporte();
    const filas = registros.map(registro => `
        <tr>
            <td>${registro.modulo}</td>
            <td>${registro.tipo}</td>
            <td>${registro.codigo}</td>
            <td>${registro.nombre}</td>
            <td>${registro.descripcion}</td>
            <td>${registro.estado}</td>
        </tr>`).join("");

    const contenido = `
        <html>
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            <h2>Reporte del Sistema de Matricula - IESTP Recuay</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Modulo</th>
                        <th>Tipo</th>
                        <th>Codigo / DNI</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    ${filas || '<tr><td colspan="6">No existen registros.</td></tr>'}
                </tbody>
            </table>
        </body>
        </html>`;

    const blob = new Blob([contenido], { type: "application/vnd.ms-excel;charset=utf-8" });
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = "reporte-sistema.xls";
    enlace.click();
    URL.revokeObjectURL(enlace.href);
}
