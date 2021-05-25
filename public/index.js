monstrarMenu()

let localMenus=[]

function mostrarMenu() {
    fetch("/api/menus")
      .then((res) => res.json())
      .then(function (datos) {
        if (datos.error) {
          feedback("Ha habido un error");
        } else {
          imprimir(datos);
        }
      });
  }

  function anyadir() {
        fetch("/api/nuevoMenu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      numeromenu: parseInt(document.getElementById("numeromenu").value),
      primerplato: document.getElementById("primerplato").value,
      segundoplato: document.getElementById("segundoplato").value,
      postre: document.getElementById("postre").value,
      precio: parseFloat(document.getElementById("precio").value)
      }),
    })
      .then(res => res.json())
      .then(function (datos) {
        datos.contenido.insertedCount >= 1
          ? imprimir(datos).localMenus=datos.contenido
          : feedback("Ha habido un error")
          
      });
  }

  function modificar(indice) {
    document.getElementById("primerplato").value = localMenus[indice].primerplato
    document.getElementById("segundoplato").value = localMenus[indice].segundoplato
    document.getElementById("postre").value = localMenus[indice].postre
    document.getElementById("precio").value = localMenus[indice].precio
  
  }

  function editar() {     
    fetch("/api/editarMenu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      numeromenu: parseInt(document.getElementById("numeromenu").value),
      primerplato: document.getElementById("primerplato").value,
      segundoplato: document.getElementById("segundoplato").value,
      postre: document.getElementById("postre").value,
      precio: parseFloat(document.getElementById("precio").value)
      }),
    })
      .then(res => res.json())
      .then(function (datos) {
        datos.contenido.insertedCount >= 1
          ? imprimir(datos).localMenus=datos.contenido
          : feedback("Ha habido un error")
          
      });
  }
function borrar(indice) {
  fetch("borrarMenu", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    numeromenu: localMenus[indice].numeromenu,
  
    }),
  })
  .then(res => res.json())
  .then(function (datos) {
    datos.contenido.deletedCount >= 1
      ? imprimir(datos).localMenus=datos.contenido
      : feedback("Ha habido un error")
      
  });
}
  function imprimir(datos) {
    menus = datos.contenido;
    let parrafo = "";
    for (let i = 0; i < datos.contenido.length; i++) {
      parrafo += `<tr><td>${datos.contenido[i].numeromenu}</td><td>${
        datos.contenido[i].primerplato}<td><td>${datos.contenido[i].segundoplato}</td><td>${datos.contenido[i].postre}</td><td>${datos.contenido[i].precio}</td><td><button onclick="modificar(${i})">Editar</button></td><td><button onclick="borrar(${i})">Borrar</button></td></tr>`;
    }
    document.getElementById(
      "mesas"
    ).innerHTML = `<table><th>Número de menú:</th><th>Primer plato:</th><th>Segundo plato:</th><th>Postre:</th><th>Precio:</th>${parrafo}</table>`;
  }

  function feedback(string) {
    document.getElementById("feedback").innerHTML = `<p>${string}</p>`,mostrarMenu();
  }

  