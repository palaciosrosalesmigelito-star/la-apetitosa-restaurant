// ==========================================
// APP.JS
// Funciones generales del Sistema
// ==========================================

document.addEventListener("DOMContentLoaded", iniciarSistema);

//-------------------------------------------
// INICIAR SISTEMA
//-------------------------------------------

function iniciarSistema() {
    console.log("Sistema Web de Matrícula iniciado.");
    configurarMenuResponsive();
}

function configurarMenuResponsive() {
    const menuToggle = document.getElementById("menuToggle");
    const menu = document.getElementById("menu");

    if (!menuToggle || !menu || menuToggle.dataset.menuListo === "true") {
        return;
    }

    menuToggle.dataset.menuListo = "true";

    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
}

//-------------------------------------------
// MOSTRAR MENSAJE
//-------------------------------------------

function mostrarMensaje(mensaje) {
    alert(mensaje);
}

//-------------------------------------------
// VALIDAR DNI
//-------------------------------------------

function validarDNI(dni) {
    return /^[0-9]{8}$/.test(dni);
}

//-------------------------------------------
// VALIDAR NOMBRE
//-------------------------------------------

function validarNombre(nombre) {
    return /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(nombre);
}

//-------------------------------------------
// VALIDAR CORREO
//-------------------------------------------

function validarCorreo(correo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

//-------------------------------------------
// VALIDAR CELULAR
//-------------------------------------------

function validarCelular(celular) {
    return /^9\d{8}$/.test(celular);
}

//-------------------------------------------
// FORMATO MONEDA
//-------------------------------------------

function formatoMoneda(valor) {
    return "S/ " + Number(valor).toFixed(2);
}

//-------------------------------------------
// CALCULAR IGV
//-------------------------------------------

function calcularIGV(subtotal) {
    return subtotal * 0.18;
}

//-------------------------------------------
// CALCULAR TOTAL
//-------------------------------------------

function calcularTotal(subtotal) {
    return subtotal + calcularIGV(subtotal);
}

//-------------------------------------------
// GENERAR CÓDIGO
//-------------------------------------------

function generarCodigo() {

    let numero = Math.floor(Math.random() * 100000);

    return "MAT-" + numero;

}

//-------------------------------------------
// GUARDAR EN LOCALSTORAGE
//-------------------------------------------

function guardarDatos(clave, datos) {

    localStorage.setItem(clave, JSON.stringify(datos));

}

//-------------------------------------------
// LEER LOCALSTORAGE
//-------------------------------------------

function leerDatos(clave) {

    let datos = localStorage.getItem(clave);

    if (datos == null) {
        return [];
    }

    return JSON.parse(datos);

}

//-------------------------------------------
// AGREGAR REGISTRO
//-------------------------------------------

function agregarRegistro(clave, registro) {

    let lista = leerDatos(clave);

    lista.push(registro);

    guardarDatos(clave, lista);

}

//-------------------------------------------
// ELIMINAR REGISTRO
//-------------------------------------------

function eliminarRegistro(clave, indice) {

    let lista = leerDatos(clave);

    lista.splice(indice, 1);

    guardarDatos(clave, lista);

}

//-------------------------------------------
// BUSCAR REGISTRO
//-------------------------------------------

function buscarRegistro(clave, texto) {

    let lista = leerDatos(clave);

    return lista.filter(item =>
        JSON.stringify(item).toLowerCase().includes(texto.toLowerCase())
    );

}

//-------------------------------------------
// LIMPIAR FORMULARIO
//-------------------------------------------

function limpiarFormulario(idFormulario) {

    document.getElementById(idFormulario).reset();

}

//-------------------------------------------
// CONFIRMAR ELIMINAR
//-------------------------------------------

function confirmarEliminar() {

    return confirm("¿Está seguro de eliminar este registro?");

}

//-------------------------------------------
// CONTAR REGISTROS
//-------------------------------------------

function contarRegistros(clave) {

    return leerDatos(clave).length;

}

//-------------------------------------------
// CERRAR SESIÓN
//-------------------------------------------

function cerrarSesion() {

    if (confirm("¿Desea cerrar sesión?")) {

        window.location.href = "login.html";

    }

}
