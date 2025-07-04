let mapa;
let marcadores = {};

function inicializarMapa() {
  const centro = { lat: -26.8241, lng: -65.2226 };

  mapa = new google.maps.Map(document.getElementById("mapa"), {
    center: centro,
    zoom: 13,
  });

  // Primera carga
  actualizarPozos();

  // Actualizar cada 10 segundos (10000 ms)
  setInterval(actualizarPozos, 10000);
}

function actualizarPozos() {
  //fetch("/api/pozos")
  fetch("datos.json")
    .then(response => response.json())
    .then(pozos => {
      pozos.forEach(pozo => {
        const id = pozo.nombre;

        // Determinar color del marcador
        let color = "green";
        switch (pozo.estado) {
          case "En mantenimiento":
            color = "yellow";
            break;
          case "Inactivo":
            color = "red";
            break;
          case "Emergencia":
            color = "orange";
            break;
          default:
            color = "green";
        }

        const icono = `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`;

        if (marcadores[id]) {
          // Si el marcador ya existe, actualizar ícono si cambió
          if (marcadores[id].icon !== icono) {
            marcadores[id].setIcon(icono);
          }
        } else {
          // Crear nuevo marcador
          const marcador = new google.maps.Marker({
            position: { lat: pozo.lat, lng: pozo.lng },
            map: mapa,
            title: pozo.nombre,
            icon: icono,
          });

          const info = new google.maps.InfoWindow({
            content: `<strong>${pozo.nombre}</strong><br>Estado: ${pozo.estado}`
          });

          marcador.addListener("click", () => {
            info.open(mapa, marcador);
          });

          marcadores[id] = marcador;
        }
      });
    })
    .catch(error => {
      console.error("Error al actualizar los pozos:", error);
    });
}
