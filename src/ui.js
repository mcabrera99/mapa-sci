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

export {descargarGroupLayer}