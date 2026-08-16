import { map } from "./map.js";
import {asignarBotonSimbolo,descargarGroupLayer,rend_panel_capas, asignar_eventos_panel_capas} from "./ui.js"
import {layergroups, baseLayers} from "./layers.js"

let estadoDibujo = {
    "dibujando":false,
    "simbolo":null,
    "seleccionado":false
}

// Asignar botón a cada capa
const overlays={}
for (const layergroup of layergroups){
    // asignarBotonSimbolo(map, layergroup );
    console.log(layergroup)
    overlays[layergroup.symbol.desc] = layergroup.layergroup
}

rend_panel_capas(layergroups)
asignar_eventos_panel_capas(layergroups)
let controlLayerState=[]


// let overlays={
//     "Puesto de comando":puntos_sci_pc,
//     "Área de espera":puntos_sci_e,
//     "Peligro biológico":puntos_peligros
// }


// let btn_descargar_sci_pc = document.getElementById("btn_descargar_sci_pc").addEventListener("click",function(ev){
//     ev.stopPropagation();
//     descargarGroupLayer(puntos_sci_pc);
// })
// let btn_descargar_pel_biol = document.getElementById("btn_descargar_pel_biol").addEventListener("click",function(ev){
//     ev.stopPropagation();
//     descargarGroupLayer(puntos_peligros);
// })
// let btn_trash_sci_pc = document.getElementById("btn_trash_sci_pc").addEventListener("click",function(ev){
//     ev.stopPropagation();
//     puntos_sci_pc.clearLayers();
// })

    // asignarBotonSimbolo(map,"sci_pc",puntos_sci_pc);
    // asignarBotonSimbolo(map,"sci_e",puntos_sci_e);
// asignarBotonSimbolo(map,"riesgo_biol",puntos_peligros);



L.control.scale({ maxWidth: 200 }).addTo(map)
L.control.layers(baseLayers, overlays).addTo(map)
