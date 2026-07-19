let map = L.map("mapa").setView([-39, -64], 4);

let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function asignarBoton(id_html) {
    document.getElementById(id_html).addEventListener("click", ev => {
        let iconSize = [30, 30];
        if (id_html == "sci_pc"){   // sci_pc.png tiene una forma particular.
            iconSize= [45, 30]
        };
        let icon = L.icon({
            iconUrl: `icons/${id_html}.png`,
            iconSize: iconSize
        });

        L.marker([-39, -64], {
            icon: icon
        }).bindPopup("Puesto de comando").addTo(map);
    })
}
asignarBoton("sci_pc");
asignarBoton("sci_e");