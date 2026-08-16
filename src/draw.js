export  let editionState = {
    "on_edition": false,
    "target_layergroup_id": null,
    "type_edition":"first draw",
    "selected": false,
}

export function dibujarPunto(map, layergroup) {
    let editionLayer = L.featureGroup().addTo(map)  // Creo una capa borrador temporal
    let icon = crearIcon(layergroup.id)             // Creo un ícono asociado a ese layergroup

    map.on("mousemove", ev => {                     // Al llevar el punto al lienzo
        editionLayer.clearLayers()
        let coords = ev.latlng
        L.marker(coords, { icon: icon, opacity:0.7 }).addTo(editionLayer)
    })

    map.on("click", ev => {                         // Al colocar el punto en el lienzo
        editionLayer.clearLayers()
        let coords = ev.latlng
        let punto = L.marker(coords, {
            icon: icon,
            draggable: true
        }).addTo(layergroup.layergroup)
        layergroup.layergroup.addTo(map)
        map.off("mousemove")
        map.off("click")
    })
}

function crearIcon(layergroup_id) {
    let iconSize = [30, 30];
    if (layergroup_id == "sci_pc") {   // sci_pc.png tiene una forma particular.
        iconSize = [45, 30]
    };
    let icon = L.icon({
        iconUrl: `icons/${layergroup_id}.png`,
        iconSize: iconSize
    });
    return icon
}