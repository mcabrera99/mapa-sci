function descargarGroupLayer(groupLayer) {
    let geojson = groupLayer.toGeoJSON();
    let blob = new Blob([JSON.stringify(geojson)], { type: "application/json" })
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url
    a.download = "DESCARGAR";
    a.click()
    console.log("Descargando...")
}
function crearIcon(nombre_layer) {
    let iconSize = [30, 30];
    if (nombre_layer == "sci_pc") {   // sci_pc.png tiene una forma particular.
        iconSize = [45, 30]
    };
    let icon = L.icon({
        iconUrl: `icons/${nombre_layer}.png`,
        iconSize: iconSize
    });
    return icon
}
function dibujarPunto(map, icon, groupLayer) {
    let editionLayer = L.featureGroup().addTo(map)  // Creo una capa borrador temporal

    map.on("mousemove", ev => {            // Al llevar el punto al lienzo
        editionLayer.clearLayers()
        let coords = ev.latlng
        L.marker(coords, { icon: icon }).addTo(editionLayer)
    })

    map.on("click", ev => {                // Al colocar el punto en el lienza
        editionLayer.clearLayers()
        let coords = ev.latlng
        let punto = L.marker(coords, {
            icon: icon,
            draggable:true
        }).addTo(groupLayer).addTo(map)
        map.off("mousemove")
        map.off("click")
    })

}

function asignarBotonSimbolo(map, id_html_element, groupLayer) {
    document.getElementById(id_html_element).addEventListener("click", ev => {
        let icon = crearIcon(id_html_element)
        dibujarPunto(map, icon, groupLayer)
    })
}

export { asignarBotonSimbolo, descargarGroupLayer }