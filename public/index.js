monstrarMenu()

let menus=[]

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
    let menu = {
      numeromenu: parseInt(document.getElementById("numeromenu").value),
      primerplato: document.getElementById("primerplato").value,
      segundoplato: document.getElementById("segundoplato").value,
      precio: document.getElementById("precio").value,
      precio: parseInt(document.getElementById("precio").value),
    };
  
    fetch("/api/nuevoMenu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(menu),
    })
      .then((res) => res.json())
      .then(function (datos) {
        datos.error
          ? feedback("Ha habido un error")
          : feedback("Menú grabado correctamente"),
          mostrarMenu();
      });
  }

  function modificar() {
    let modificar = {
        primerplato: document.getElementById("primerplato2").value,
        segundoplato: document.getElementById("segundoplato2").value,
        precio: document.getElementById("precio2").value,
        precio: parseInt(document.getElementById("precio2").value),
      }
    fetch(`/api/modificar/${modificar}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(function (datos) {
        datos.error
          ? feedback("Ha habido un error")
          : feedback("Modificado correctamente"),
          mostrarMenu();
      });
  }
function borrar(i) {
  fetch(`/api/borrarMenu/${menus[i].numeromenu}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(function (datos) {
      if (datos.error) {
        feedback("Ha habido un error");
      } else {
        datos.contenido.deletedCount > 0
          ? feedback("Se ha borrado correctamente")
          : feedback("No se ha podido encontrar el menu</h3>");
        mostrarMenu();
      }
    });
}
  function imprimir(datos) {
    menus = datos.contenido;
    let parrafo = "";
    for (let i = 0; i < datos.contenido.length; i++) {
      parrafo += `<tr><td>${datos.contenido[i].numeromenu}</td><td>${
        datos.contenido[i].primerplato}<td><td>${datos.contenido[i].segundoplato}</td><td>${datos.contenido[i].postre}</td><td>${datos.contenido[i].precio}</td><button onclick="borrar(${i})">Borrar</button></td></tr>`;
    }
    document.getElementById(
      "mesas"
    ).innerHTML = `<table><th>Número de menú:</th><th>Primer plato:</th><th>Segundo plato:</th><th>Postro:</th><th>Precio:</th>${parrafo}</table>`;
  }

  function feedback(string) {
    document.getElementById("feedback").innerHTML = `<p>${string}</p>`;
  }

  