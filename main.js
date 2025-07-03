function inicializarMapa() {
  // Coordenadas de San Miguel de Tucumán como centro
  const centro = { lat: -26.8241, lng: -65.2226 };

  // Crear el mapa
  const mapa = new google.maps.Map(document.getElementById("mapa"), {
    center: centro,
    zoom: 13,
  });

  // Agregar un marcador de prueba
  const marcador = new google.maps.Marker({
    position: centro,
    map: mapa,
    title: "Marcador de prueba",
  });
}
