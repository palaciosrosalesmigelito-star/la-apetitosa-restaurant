document.getElementById("loginForm").addEventListener("submit", function(e){

    e.preventDefault();

    let usuario = document.getElementById("usuario").value.trim();
    let password = document.getElementById("password").value.trim();

    if(usuario === "admin" && password === "123456"){

        alert("Bienvenido al Sistema");

        window.location.href = "dashboard.html";

    }else{

        alert("Usuario o contraseña incorrectos.");

    }

});