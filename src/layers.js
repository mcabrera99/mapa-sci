import { symbols } from "./symbols.js";

export const layergroups = []

for (const symbol of symbols) {
    let layergroup = L.featureGroup()
    layergroups.push({
        id:symbol.id,
        symbol:symbol,
        layergroup:layergroup
    })
}




const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
const argenmap = L.tileLayer("https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png", {
    attribution: 'Instituto Geográfico Nacional'
});
export const baseLayers = {
    "Open Street Map": osm,
    "Argenmap": argenmap
}
