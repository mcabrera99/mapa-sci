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
function asignarBotonSimbolo(map,id_html_element, groupLayer) {
    document.getElementById(id_html_element).addEventListener("click", ev => {
        let iconSize = [30, 30];
        if (id_html_element == "sci_pc") {   // sci_pc.png tiene una forma particular.
            iconSize = [45, 30]
        };
        let icon = L.icon({
            iconUrl: `icons/${id_html_element}.png`,
            iconSize: iconSize
        });
        let punto = L.marker([-39, -64], {
            icon: icon
        }).bindPopup("Puesto de comando").addTo(groupLayer).addTo(map);
    })
}
export {asignarBotonSimbolo,descargarGroupLayer}