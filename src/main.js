import { compass,CompassControl } from "./controls.js";
import { map } from "./map.js";
import {descargarGroupLayer,rend_panel_capas, asignar_eventos_panel_capas} from "./ui.js"
import {layergroups, baseLayers} from "./layers.js"
import {insertarReloj} from "./clock.js"

console.log(compass)
let compass1 = new CompassControl()
compass1.addTo(map)

const overlays={}
for (const layergroup of layergroups){
    overlays[layergroup.symbol.desc] = layergroup.layergroup
}

rend_panel_capas(layergroups)
asignar_eventos_panel_capas(layergroups,map)
let controlLayerState=[]
insertarReloj()

baseLayers.Argenmap.addTo(map);

L.control.scale({ maxWidth: 200 }).addTo(map)
L.control.layers(baseLayers, overlays).addTo(map)
