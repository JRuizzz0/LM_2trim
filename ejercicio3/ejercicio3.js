const usuarios = document.querySelectorAll("div[data-user]");
const mensaje = document.getElementById("mensaje");

function status(user){
    const status = user.dataset.status

    if(status === "activo"){
        user.dataset.status ="inactivo";
        showMensaje("Usuario desactivado")
    }else{
        user.dataset.status = "activo";
        showMensaje("Usuario activado");
    }
}

function showMensaje(texto){

    mensaje.innerText = texto;

    setTimeout(()=>{
        mensaje.innerText="";
    },2000);
}

function rol(user){

    const rol = user.dataset.role

    if(rol === "admin"){
        user.dataset.role ="usuario"
        showMensaje("Rol cambiado a usuario")
    }else{
        user.dataset.role ="admin"
        showMensaje("Rol cambiado a admin")
    }

}

usuarios.forEach((user) =>{
    
    const botones = user.querySelectorAll("button")
    
    botones.forEach((button) =>{
        button.addEventListener("click", function(){
            
            const accion = button.dataset.action;

            if(accion ==="activar"){
                status(user)
            }else if(accion === "rol"){
                rol(user)
            }
            

        });
    });

})