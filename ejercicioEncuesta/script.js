const btnCerrar = document.getElementById("cerrar");
const btnReiniciar = document.getElementById("reiniciar");
const contPartidos = document.getElementById("partidos");
const ganador = document.getElementById("ganador");

let contadorTotal = 0;

fetch("galeria.xml")
  .then((response) => response.text())
  .then((data) => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "text/xml");
    const partidos = xml.getElementsByTagName("partido");

    for (let partido of partidos) {
      const nombre = partido.getElementsByTagName("nombre")[0].textContent;
      contPartidos.innerHTML += `
        <div data-party data-votos="0" data-win="false">
          <p>${nombre}</p>
          <button class="voto">Votar</button>
          
        </div>
      `;
    }

    funcionalidadBotones();
  });

function funcionalidadBotones() {
  const botones = document.querySelectorAll(".voto");
  botones.forEach((boton) => {
    boton.addEventListener("click", votar);
  });
}

const contador = document.getElementById("contadorTotal");

function votar(evento) {
  const partido = evento.target.parentElement;
  let votos = Number(partido.dataset.votos);
  votos++;
  partido.dataset.votos = votos;
  

  evento.target.textContent = `Votar: ${votos}`;
  
  contadorTotal++;
  actualizarContador();
  verificarGanador();
}   

function actualizarContador() {
  contador.innerText = `Total: ${contadorTotal}`;
}

function verificarGanador() {
  const partidos = document.querySelectorAll("[data-party]");
  let maxVotos = -1;
  let ganadorNombre = "";

  partidos.forEach((partido) => {
    const nombre = partido.querySelector("p").innerText;
    const votos = Number(partido.dataset.votos);
    if (votos > maxVotos) {
      maxVotos = votos;
      ganadorNombre = nombre;
    }
  });

  if (maxVotos > 0) {
    ganador.innerText = `Ganador: ${ganadorNombre} (${maxVotos} votes)`;
  }
}

btnCerrar.addEventListener("click", function() {
    const contCerrar = document.getElementById("modalCerrar");
    partidos.style.dysplay = "block"
    
    contCerrar.innerHTML = `
        <p>Cerrada la votación</p>
        
        <script>Ganador: ${ganadorNombre} (${maxVotos} votes)</script>;
         
      `;
  
});


btnReiniciar.addEventListener("click", function(){
  const partidos = document.querySelectorAll("[data-party]");
  partidos.forEach(partido => {
    partido.dataset.votos = "0";
    const boton = partido.querySelector(".voto");
    boton.textContent = "Votar";
  });
  
  contadorTotal = 0;
  maxVotos = -1;
  ganadorNombre = "";
  actualizarContador();
  ganador.innerText = "";
});