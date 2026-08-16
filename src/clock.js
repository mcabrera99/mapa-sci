export function insertarReloj(){
    setInterval( actualizarReloj, 1000)
}

function actualizarReloj(){
    const time = new Date(Date.now())
    const reloj = document.getElementById("reloj")
    reloj.innerHTML= time.toString();
}
