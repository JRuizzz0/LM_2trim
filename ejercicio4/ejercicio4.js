const btnCargar = document.getElementById("cargar");
const inputBuscar = document.getElementById("buscar");
const selectPrioridad = document.getElementById("select");
const resultado = document.getElementById("resultado");

let listaTareas = [];


function mostrarTareas(lista){
    if(lista.length === 0){
        resultado.innerHTML="<p>No hay tareas</p>"
        return;
    }

    resultado.innerHTML="<h2>Lista de Tareas</h2>"

    lista.forEach((tarea) => {

        resultado.innerHTML += `

        <div  data-tarea
                data-status="${tarea.estado}"
                data-prioridad="${tarea.prioridad}">
            <p>${tarea.nombre}</p>
            <button id="hecha" data-index="${tarea.id}">Marcar como hecha</button>
        </div>
        `;

    });

    const botones = document.querySelectorAll("button[data-index]");

    botones.forEach((boton) =>{
        boton.addEventListener("click",marcarHecha);
    })

}

function filtrar(){
    const texto = inputBuscar.value.toLowerCase();
    const p = selectPrioridad.value.toLowerCase();

    const tareasFiltradas = listaTareas.filter((f)=>{

        const coincidencia = f.nombre.toLowerCase().includes(texto);
        const coincidendiaP = p === "todas" || f.prioridad === p;

        return coincidencia && coincidendiaP


    });

    mostrarTareas(tareasFiltradas)

}

function marcarHecha(evento){

    const id = parseInt(evento.target.dataset.index);

    const tarea = listaTareas.find((t) => t.id === id);

    if(tarea){
        tarea.estado = "hecha";
    }

    filtrar()
}

btnCargar.addEventListener("click",  function(){

    listaTareas = [

        {id: 1, nombre: "Estudiantes HTML", prioridad: "alta", estado:"pendiente"},
        {id: 2, nombre: "Hacer ejercicios", prioridad: "media", estado:"pendiente"},
        {id: 3, nombre: "Apuntes", prioridad: "media", estado:"pendiente"},
        {id: 4, nombre: "Practicar css", prioridad: "baja", estado:"pendiente"}

    ];

    mostrarTareas(listaTareas)

});


inputBuscar.addEventListener("input", filtrar);
selectPrioridad.addEventListener("change", filtrar);
