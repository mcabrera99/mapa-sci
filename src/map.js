import {INITIAL_COORDS, INITIAL_ZOOM} from "./config.js"
export let map = L.map("mapa",{rotate:true}).setView(INITIAL_COORDS, 4);