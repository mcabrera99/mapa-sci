import { layergroups} from "./layers.js"
import {  dibujarPunto} from "./draw.js"
// RENDERIZADO
function rend_panel_capas(layergroups) {
    let html = ""
    for (const layergroup of layergroups) {
        let id = layergroup.id
        let plantilla = `<div class="contenedor_simbolo" id="btn_contenedor_${id}">
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

function asignar_eventos_panel_capas(layergroups, map) {
    for (const layergroup of layergroups) {
        let id = layergroup.id
        let id_contenedor = `btn_contenedor_${id}`
        let id_trash = `btn_trash_${id}`
        let id_descargar = `btn_descargar_${id}`
        document.getElementById(id_contenedor).addEventListener("click", ev => {
            dibujarPunto(map, layergroup)
        })
        document.getElementById(id_trash).addEventListener("click", ev => {
            ev.stopPropagation()
            borrarGroupLayer(layergroup)
        })
        document.getElementById(id_descargar).addEventListener("click", ev => { descargarGroupLayer(layergroup); })
    }
}

function borrarGroupLayer(layergroup) {
    console.log("Borrando capa", layergroup)
    layergroup.layergroup.clearLayers();
}

function descargarGroupLayer(layergroup) {
    let geojson = layergroup.layergroup.toGeoJSON();
    let blob = new Blob([JSON.stringify(geojson)], { type: "application/json" })
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url
    a.download = "DESCARGAR";
    a.click()
    console.log("Descargando...")
}


export { descargarGroupLayer, rend_panel_capas, asignar_eventos_panel_capas }