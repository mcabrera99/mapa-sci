export class CompassControl extends L.Control{
    onAdd(map){
        // let html = L.DomUtil.create("div",undefined,map)
        let html = L.DomUtil.create("div")
        html.innerHTML = `<img src="icons/norte.png" style= "height:30px">`
        console.log("Creación",html)
        return html
    }
}

export let compass = new CompassControl()