const btnFiltrar = document.getElementById("filtrar");
const btnFavoritos = document.getElementById("favoritos");
const select = document.getElementById("categoria");
const contenedorProductos = document.getElementById("productos");
const contador = document.getElementById("contador");

let totalFavoritos = 0;
let favoritos = false;

fetch("ejercicio5.xml").then((response) => response.text())
    .then((data) => {

        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "text/xml");
        const productos = xml.getElementsByTagName("producto");

        for(let producto of productos){
            const nombre = producto.getElementsByTagName("nombre")[0].textContent;
            const categoria = producto.getElementsByTagName("categoria")[0].textContent;

            contenedorProductos.innerHTML += `
            
            <div data-product
                data-category = "${categoria}"
                data-fav = "false">

                <p>${nombre}</p>
                <button class="fav">Añadir a favoritos</button>
                
            </div>
            `;
            funcionalidadBotones();

        }
    });

    function funcionalidadBotones(){

        const botones = document.querySelectorAll(".fav");

        botones.forEach((boton) => {
            boton.addEventListener("click", marcarFavorito );
        });
    }

    function marcarFavorito(evento){

        const producto = evento.target.parentElement;

        if(producto.dataset.fav === "true"){
            producto.dataset.fav = "false";
            totalFavoritos--;
            evento.target.textContent = "Añadir a favoritos";
        }else{
            producto.dataset.fav ="true";
            totalFavoritos++;
            evento.target.textContent = "Quitar de favoritos";
        }   

        actualizarContador();

    }

    function actualizarContador(){
        contador.innerText = `Favoritos: ${totalFavoritos}`;
    }

    function filtrar(){

        const categoria = select.value;

        const productos = document.querySelectorAll("div[data-product");

        productos.forEach((producto) => {
            if(categoria === "todos" || producto.dataset.category === categoria){
                producto.style.display = "block";
            }else{
                producto.style.display = "none";
            }
        });

    }

    function verFavoritos(){
        const productos = document.querySelectorAll("div[data-product");

        favoritos = !favoritos

        productos.forEach((producto) => {

            if(favoritos){

                if(producto.dataset.fav === "true"){
                    producto.style.display ="block";
                }else{
                    producto.style.display ="none";
                }

            }else{
                producto.style.display = "block";
            }

        });

        if(favoritos){
            btnFavoritos.textContent = "Ver todos";
        }else{
            btnFavoritos.textContent = "Ver favoritos";
        }
        
    }

    btnFiltrar.addEventListener("click", filtrar);
    btnFavoritos.addEventListener("click", verFavoritos);