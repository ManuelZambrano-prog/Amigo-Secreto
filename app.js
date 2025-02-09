let listaAmigos = [];
let nombre = "";

function ingresarNombre(){
    nombre = document.getElementById("amigo").value;
}

function limpiarElementoPorId(id) {
    let elemento = document.getElementById(id);
    if(elemento) {
        if("value" in elemento) {
            elemento.value = "";
        }else{
            elemento.innerHTML = "";
        }
    }else{
        console.warn(`Elemento con id "${id}" no encontrado.`);
    }
}

function asignarTextoElemento(idElemento, texto, usarHTML = false, agregar = false) {
    let elemento = document.getElementById(idElemento);
    if(elemento) {
        if("value" in elemento) {
            elemento.value = texto;
        }else {
            elemento[usarHTML ? "innerHTML" : "textContent"] += agregar ? texto : "";
            if(!agregar) {
                elemento[usarHTML ? "innerHTML" : "textContent"] = texto;
            }
        }
    } else {
        console.warn(`Elemento con id "${idElemento}" no encontrado.`);
    }
}

function mostrarLista() {
    if (listaAmigos.length === 0) {
        asignarTextoElemento('listaAmigos', "<li>No hay amigos en la lista</li>", true);
        return;
    }

    let listaHTML = listaAmigos.map(amigo => `<li>${amigo}</li>`).join("");
    asignarTextoElemento('listaAmigos', listaHTML, true, false);
}

function limpiarLista(){
    listaAmigos.length = 0;
    return listaAmigos;
}
    
function agregarAmigo(){
    ingresarNombre();
    if(nombre === ""){
        alert("Por favor ingresar un nombre:");
    }else if(listaAmigos.includes(nombre)){
        alert("Ese nombre ya fué ingresado, por favor coloca otro:");
        limpiarElementoPorId('amigo');
    } else {
        listaAmigos.push(nombre);
        mostrarLista();
    }
    return limpiarElementoPorId('amigo');
}

function sortearAmigo() {
    if (listaAmigos.length === 0) {
        alert("Ingrese el nombre de almenos una persona:");
        return;
    }
    let amigoGanador = generarAmigoSorteado(listaAmigos);
    asignarTextoElemento("resultado", `<li>El amigo secreto sorteado es: ${amigoGanador}</li>`, true, true);
    limpiarElementoPorId('listaAmigos');
    asignarTextoElemento("title-input", ``, false, false)
    document.getElementById('reiniciar').removeAttribute('disabled');
}


function reiniciarJuegoAmigoSecreto(){
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    asignarTextoElemento("title-input", `Digite el nombre de sus amigos`, false, false);
    asignarTextoElemento("resultado", ``, false, false);
    limpiarLista();
}

function generarAmigoSorteado(listaAmigos){
    let amigoSorteado = Math.floor(Math.random() * listaAmigos.length);
    return listaAmigos[amigoSorteado];
}

function limpiarLista(){
    listaAmigos.length = 0;
    return listaAmigos;
}