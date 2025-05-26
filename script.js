const container = document.createElement("div");
const button = document.querySelector("button");
const input = document.getElementById("buscar");

let paises_all = [];

fetch("https://restcountries.com/v3.1/all")
  .then((respuesta) => respuesta.json())
  .then((paises) => {
    paises_all = paises;

    button.addEventListener("click", () => {
      container.id = "resultado";
      document.body.appendChild(container);
      const pais_search = input.value.trim().toLowerCase();
      container.innerHTML = ""; // Limpiar resultados anteriores

      let encontrados = 0;

      paises_all.forEach((pais) => {
        const nombre = pais.name.common.toLowerCase();
        const region = pais.region.toLowerCase();

        if (nombre.includes(pais_search) || region.includes(pais_search)) {
          mostrarPais(pais);
          encontrados++;
        }
      });

      if (encontrados === 0) {
        const p = document.createElement("p");
        p.textContent = "No se encontraron coincidencias.";
        container.appendChild(p);
      }
    });

    function mostrarPais(pais) {
      const card = document.createElement("div");
      card.classList.add("resultado");

      const img = document.createElement("img");
      img.src = pais.flags.png;
      img.alt = `Bandera de ${pais.name.common}`;
      card.appendChild(img);

      const p = document.createElement("p");
      p.textContent = `${pais.name.common}, ${pais.region}`;
      card.appendChild(p);

      container.appendChild(card);
    }
  });