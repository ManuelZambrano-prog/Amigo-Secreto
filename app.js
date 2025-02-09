let listaAmigos = [];
let nombre = "";

function ingresarNombre() {
    nombre = document.getElementById("amigo").value;
}

function limpiarElementoPorId(id) {
    let elemento = document.getElementById(id);
    if (elemento) {
        if ("value" in elemento) {
            elemento.value = "";
        } else {
            elemento.innerHTML = "";
        }
    } else {
        console.warn(`Elemento con id "${id}" no encontrado.`);
    }
}

function asignarTextoElemento(idElemento, texto, usarHTML = false, agregar = false) {
    let elemento = document.getElementById(idElemento);
    if (elemento) {
        if ("value" in elemento) {
            elemento.value = texto;
        } else {
            elemento[usarHTML ? "innerHTML" : "textContent"] += agregar ? texto : "";
            if (!agregar) {
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

function limpiarLista() {
    listaAmigos.length = 0;
    return listaAmigos;
}

function agregarAmigo() {
    ingresarNombre();
    if (nombre === "") {
        alert("Por favor ingresar un nombre:");
    } else if (listaAmigos.includes(nombre)) {
        alert("Ese nombre ya fue ingresado, por favor coloca otro:");
        limpiarElementoPorId('amigo');
    } else {
        listaAmigos.push(nombre);
        mostrarLista();
    }
    return limpiarElementoPorId('amigo');
}

function sortearAmigo() {
    if (listaAmigos.length === 0) {
        alert("Ingrese el nombre de al menos una persona:");
        return;
    }

    // Crear una copia de la lista de amigos
    let listaAmigosCopia = [...listaAmigos];

    let amigoGanador;
    while (listaAmigosCopia.length > 0) {
        // Generar un índice aleatorio
        let indiceAleatorio = Math.floor(Math.random() * listaAmigosCopia.length);

        // Asignar el amigo secreto
        amigoGanador = listaAmigosCopia[indiceAleatorio];

        // Eliminar el nombre asignado de la copia de la lista
        listaAmigosCopia.splice(indiceAleatorio, 1);

        // Verificar si la lista de amigos está vacía
        if (listaAmigosCopia.length === 0) {
            asignarTextoElemento("resultado", `<li>El amigo secreto sorteado es: ${amigoGanador}</li>`, true, true);
            limpiarElementoPorId('listaAmigos');
            asignarTextoElemento("title-input", ``, false, false)
            document.getElementById('reiniciar').removeAttribute('disabled');
            alert("¡Ya no tienes más amigos!");
            return;
        } else {
            asignarTextoElemento("resultado", `<li>El amigo secreto sorteado es: ${amigoGanador}</li>`, true, true);
            limpiarElementoPorId('listaAmigos');
            asignarTextoElemento("title-input", ``, false, false)
            document.getElementById('reiniciar').removeAttribute('disabled');
        }
    }
}

function reiniciarJuegoAmigoSecreto() {
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    asignarTextoElemento("title-input", `Digite el nombre de sus amigos`, false, false);
    asignarTextoElemento("resultado", ``, false, false);
    limpiarLista();
}