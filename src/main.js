import { map } from "./map.js";
import {asignarBotonSimbolo,descargarGroupLayer} from "./ui.js"

let estadoDibujo = {
    "dibujando":false,
    "simbolo":null,
    "seleccionado":false
}
console.log("__",map)
let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
let argenmap = L.tileLayer("https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png", {
    attribution: 'Instituto Geográfico Nacional'
}).addTo(map);
let baseLayers = {
    "Open Street Map": osm,
    "Argenmap": argenmap
}



let controlLayerState=[]


let puntos_sci_pc = L.featureGroup()
let puntos_sci_e = L.featureGroup()
let puntos_peligros = L.featureGroup()


let overlays={
    "Puesto de comando":puntos_sci_pc,
    "Área de espera":puntos_sci_e,
    "Peligro biológico":puntos_peligros
}


let btn_descargar_sci_pc = document.getElementById("btn_descargar_sci_pc").addEventListener("click",function(ev){
    ev.stopPropagation();
    descargarGroupLayer(puntos_sci_pc);
})
let btn_descargar_pel_biol = document.getElementById("btn_descargar_pel_biol").addEventListener("click",function(ev){
    ev.stopPropagation();
    descargarGroupLayer(puntos_peligros);
})
let btn_trash_sci_pc = document.getElementById("btn_trash_sci_pc").addEventListener("click",function(ev){
    ev.stopPropagation();
    puntos_sci_pc.clearLayers();
})

asignarBotonSimbolo(map,"sci_pc",puntos_sci_pc);
asignarBotonSimbolo(map,"sci_e",puntos_sci_e);
asignarBotonSimbolo(map,"peligro_biol",puntos_peligros);

L.control.scale({ maxWidth: 200 }).addTo(map)
L.control.layers(baseLayers, overlays).addTo(map)
