let map = L.map("mapa").setView([-39, -64], 4);

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

function asignarBotonSimbolo(id_html) {
    document.getElementById(id_html).addEventListener("click", ev => {
        let iconSize = [30, 30];
        if (id_html == "sci_pc") {   // sci_pc.png tiene una forma particular.
            iconSize = [45, 30]
        };
        let icon = L.icon({
            iconUrl: `icons/${id_html}.png`,
            iconSize: iconSize
        });
        let punto = L.marker([-39, -64], {
            icon: icon
        }).bindPopup("Puesto de comando").addTo(puntos_sci).addTo(map);
        // verCapas(puntos_sci)
        descargarPunto(punto)
    })
}

let btn_descargar = document.getElementById("btn_descargar").addEventListener("click",function(ev){
    descargarGroupLayer(puntos_sci);
})

function verCapas(mapa) {
    mapa.eachLayer(function (layer) {
        let geojson = layer.toGeoJSON();
        console.log("Geojson",geojson)
    })
}

function descargarGroupLayer(groupLayer){
    let geojson = groupLayer.toGeoJSON();
    let blob = new Blob([JSON.stringify(geojson)],{type:"application/json"})
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href=url
    a.download = "DESCARGAR";
    a.click()
    console.log("Descargando...")
}

asignarBotonSimbolo("sci_pc");
asignarBotonSimbolo("sci_e");

L.control.scale({ maxWidth: 200 }).addTo(map)
L.control.layers(baseLayers).addTo(map)
