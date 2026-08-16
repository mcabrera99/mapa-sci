import { map } from "./map.js";
import {descargarGroupLayer,rend_panel_capas, asignar_eventos_panel_capas} from "./ui.js"
import {layergroups, baseLayers} from "./layers.js"


const overlays={}
for (const layergroup of layergroups){
    overlays[layergroup.symbol.desc] = layergroup.layergroup
}

rend_panel_capas(layergroups)
asignar_eventos_panel_capas(layergroups,map)
let controlLayerState=[]


baseLayers.Argenmap.addTo(map);

L.control.scale({ maxWidth: 200 }).addTo(map)
L.control.layers(baseLayers, overlays).addTo(map)
