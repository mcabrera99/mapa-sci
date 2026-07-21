let map = L.map("mapa").setView([-39, -64], 4);
let estadoDibujo = {
    "dibujando":false,
    "simbolo":null,
    "seleccionado":false
}

import {asignarBotonSimbolo,descargarGroupLayer} from "./ui.js"




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

let puntos_sci = L.featureGroup()
let puntos_peligros = L.featureGroup()
let overlays = {
    "SCI": puntos_sci,
    "Peligros": puntos_peligros
}




let btn_descargar_sci = document.getElementById("btn_descargar_sci").addEventListener("click",function(ev){
    descargarGroupLayer(puntos_sci);
})
let btn_descargar_peligros = document.getElementById("btn_descargar_peligros").addEventListener("click",function(ev){
    descargarGroupLayer(puntos_peligros);
})


asignarBotonSimbolo(map,"sci_pc",puntos_sci);
asignarBotonSimbolo(map,"sci_e",puntos_sci);
asignarBotonSimbolo(map,"peligro_biol",puntos_peligros);

L.control.scale({ maxWidth: 200 }).addTo(map)
L.control.layers(baseLayers).addTo(map)
