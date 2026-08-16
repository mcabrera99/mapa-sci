import { layergroups } from "./layers.js"
// RENDERIZADO
function rend_panel_capas(layergroups) {
    let html = ""
    for (const layergroup of layergroups) {
        let id = layergroup.id
        let plantilla = `<div class="contenedor_simbolo" id="${id}">
                    <img class="simbolo" src="${layergroup.symbol.icon_path}">
                    <p>${layergroup.symbol.desc}</p>
                    <button class="btn_trash" id="btn_trash_${id}">
                        <img src="icons/trash.png">
                    </button>
                    <button class="btn_descargar" id="btn_descargar_${id}">
                        <img src="icons/descargar.png">
                    </button>
                </div>`
        html += plantilla
        // console.log(html)
        document.getElementById("panel_simbolos").innerHTML = html
    }
}

function asignar_eventos_panel_capas(layergroups) {
    for (const layergroup of layergroups) {
        let id = layergroup.id
        let id_trash = `btn_trash_${id}`
        let id_descargar = `btn_descargar_${id}`
        document.getElementById(id_trash).addEventListener("click",ev=>{ 
            ev.stopPropagation()
            borrarGroupLayer(layergroup.layergroup)})
        document.getElementById(id_descargar).addEventListener("click", ev=> {descargarGroupLayer(layergroup.layergroup);})
    }
}

function asignarBotonSimbolo(map, id_html_element, groupLayer) {
    document.getElementById(id_html_element).addEventListener("click", ev => {
        let icon = crearIcon(id_html_element)
        dibujarPunto(map, icon, groupLayer)
    })
}

function borrarGroupLayer(layergroup) {
    console.log("Borrando capa", layergroup)
    layergroup.clearLayers();
}

function descargarGroupLayer(layergroup) {
    let geojson = layergroup.toGeoJSON();
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
        let cant_1 = groupLayer.getLayers().length
        let coords = ev.latlng
        let punto = L.marker(coords, {
            icon: icon,
            draggable: true
        }).addTo(groupLayer)
        groupLayer.addTo(map)
        map.off("mousemove")
        map.off("click")
    })

}



function actualizarControlLayer(map) {

    map.eachLayer(function (layer) {

    })
    let layers = map.layers()
}



export { asignarBotonSimbolo, descargarGroupLayer, rend_panel_capas, asignar_eventos_panel_capas }