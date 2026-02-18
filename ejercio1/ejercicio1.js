 const inputNombre = document.getElementById("nombre");
 const botonSaludar = document.getElementById("saludar");
 const botonColor = document.getElementById("cambiarColor");
 const resultado = document.getElementById("resultado");
 const contenedor = document.getElementById("contenedor");

 let colorActivo = false;

 botonSaludar.addEventListener("click", function(){

    const nombre = inputNombre.value.trim()

    if(nombre === ""){
        resultado.innerText="Debe de escribir un nombre"
    }else{
        resultado.innerText=`Hola, ${nombre}, bienvenidoo!!`
    }

 });


 botonColor.addEventListener("click", function(){

    if(colorActivo){
        contenedor.style.backgroundColor = "white";
        resultado.innerText = "Color original restaurado";
    }else{
        contenedor.style.backgroundColor = "#9c377fff"
        resultado.innerText = "Color de fondo cambiado"
    }

    colorActivo =! colorActivo

 });
