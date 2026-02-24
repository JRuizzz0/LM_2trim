const btnCerrar = document.getElementById("cerrar");
const btnReiniciar = document.getElementById("reiniciar");
const contPartidos = document.getElementById("partidos");
const ganador = document.getElementById("ganador");
const contador = document.getElementById("contadorTotal");
const modalCerrar = document.getElementById("modalCerrar");

let contadorTotal = 0;
let maxVotosGlobal = 0;
let ganadorNombreGlobal = "Ninguno";

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
          <p class="nombre">${nombre}</p>
          <button class="voto">Votar</button>
          <span>Votos: <strong class="votos-texto">0</strong></span>
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

function votar(evento) {
  const partido = evento.target.parentElement;
  let votos = Number(partido.dataset.votos);
  votos++;
  
  partido.dataset.votos = votos;
  
  const textoVotos = partido.querySelector(".votos-texto");
  textoVotos.innerText = `${votos}`;
  
  contadorTotal++;
  actualizarContador();
  verificarGanador();
}   

function actualizarContador() {
  contador.innerText = `Total: ${contadorTotal}`;
}

function verificarGanador() {
  const partidos = document.querySelectorAll("[data-party]");
  maxVotosGlobal = 0;
  ganadorNombreGlobal = "";

  partidos.forEach((partido) => {
    const votos = Number(partido.dataset.votos);
    if (votos > maxVotosGlobal) {
      maxVotosGlobal = votos;
    }
  });

  partidos.forEach((partido) => {
    const nombre = partido.querySelector(".nombre").innerText;
    const votos = Number(partido.dataset.votos);
    
    if (votos === maxVotosGlobal && maxVotosGlobal > 0) {
      partido.dataset.win = "true";
      ganadorNombreGlobal += ganadorNombreGlobal ? ` y ${nombre}` : nombre;
    } else {
      partido.dataset.win = "false";
    }
  });

  if (maxVotosGlobal > 0) {
    ganador.innerText = `Ganador: ${ganadorNombreGlobal} (${maxVotosGlobal} votos)`;
  } else {
    ganador.innerText = "Ganador: Ninguno";
  }
}

btnCerrar.addEventListener("click", function() {
  contPartidos.classList.add("bloqueado");
  
  modalCerrar.innerHTML = `
      <div class="modal-contenido">
        <h2>Votación Cerrada</h2>
        <p>El ganador definitivo es: <strong>${ganadorNombreGlobal}</strong> con ${maxVotosGlobal} votos.</p>
      </div>
  `;
  modalCerrar.style.display = "block";
});

btnReiniciar.addEventListener("click", function() {
  const partidos = document.querySelectorAll("[data-party]");
  
  partidos.forEach(partido => {
    partido.dataset.votos = "0";
    partido.dataset.win = "false"; // Quitar el verde
    const textoVotos = partido.querySelector(".votos-texto");
    textoVotos.innerText = "0";
  });
  
  contadorTotal = 0;
  maxVotosGlobal = 0;
  ganadorNombreGlobal = "Ninguno";
  
  actualizarContador();
  ganador.innerText = "Ganador: Ninguno";
  
  contPartidos.classList.remove("bloqueado");
  modalCerrar.style.display = "none";
});
