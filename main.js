function inicializarMapa() {
  const centro = { lat: -26.8241, lng: -65.2226 };

  const mapa = new google.maps.Map(document.getElementById("mapa"), {
    center: centro,
    zoom: 13,
  });

  fetch("datos.json")
    .then(response => response.json())
    .then(pozos => {
      pozos.forEach(pozo => {
        // Asignar color según el estado
        let color = "green"; // Por defecto
        switch (pozo.estado) {
          case "Activo":
            color = "green";
            break;
          case "En mantenimiento":
            color = "orange";
            break;
          case "Inactivo":
            color = "red";
            break;
          case "Emergencia":
            color = "purple";
            break;
          default:
            color = "blue"; // Para estados desconocidos
        }

        const marcador = new google.maps.Marker({
          position: { lat: pozo.lat, lng: pozo.lng },
          map: mapa,
          title: pozo.nombre,
          icon: `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
        });

        const info = new google.maps.InfoWindow({
          content: `<strong>${pozo.nombre}</strong><br>Estado: ${pozo.estado}`
        });

        marcador.addListener("click", () => {
          info.open(mapa, marcador);
        });
      });
    })
    .catch(error => {
      console.error("Error al cargar los datos de pines:", error);
    });
}
