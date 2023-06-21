let puntosJugador = 0;
let puntosPC = 0;

let jugador = document.querySelector("#jugador");
let pc = document.querySelector("#computadora");
let instrucciones = document.querySelector("#instrucciones");
let contenedorPuntosJugador = document.querySelector("#puntos-jugador");
let contenedorPuntosPC  = document.querySelector("#puntos-computadora");
let elegiOpcion = document.querySelector("#elegi-tu-opcion");
let mensaje = document.querySelector("#mensaje");
let contenedorEleccionJugador = document.querySelector("#uso-jugador");
let contenedorEleccionPC = document.querySelector("#uso-computadora");
let mensajeGanador = document.querySelector("#gana-punto");
let reiniciar = document.querySelector("#reinicio");

let botones = document.querySelectorAll(".opcion")
botones.forEach(boton => {
    boton.addEventListener("click", iniciarTurno);
})

function iniciarTurno(e){
    // obtenemos el id del boton presionado
    let eleccionJ = calcularEleccion(e.currentTarget.id);
    // elige un numero entre 0,1 y 2 y lo redondea.
    let eleccionPC = Math.floor(Math.random() * 3) ;
    // realizamos el cambio de imagen en las opciones "usaste" y "la computadora uso"
    cambiosImg(eleccionJ,eleccionPC);

    // removemos las clases en caso que exista alguna
    remove(mensajeGanador)

    calcularGanador(eleccionJ,eleccionPC);
    mensaje.classList.remove("disabled");
    mensajeGanador.classList.remove("disabled");
    if(puntosJugador === 5 || puntosPC === 5){
        if(puntosJugador === 5){
            instrucciones.innerText = "GANASTE EL JUEGO!"
            jugador.classList.add("ganador")
            computadora.classList.add("perdedor")
            instrucciones.classList.add("ganador")
        }else{
            jugador.classList.add("perdedor")
            computadora.classList.add("ganador")
            instrucciones.innerText = "PERDISTE!"
            instrucciones.classList.add("perdedor")
        }
        mensaje.classList.add("disabled");
        mensajeGanador.classList.add("disabled");
        elegiOpcion.classList.add("disabled");
        reiniciar.classList.remove("disabled");
        reiniciar.addEventListener("click", reiniciarJuego);
    }
}

function reiniciarJuego(){
    elegiOpcion.classList.remove("disabled");
    reiniciar.classList.add("disabled");
    instrucciones.innerText = "El primero en llegar a 5 puntos gana!";
    puntosJugador = 0;
    puntosPC = 0;
    remove(jugador);
    remove(pc);
    contenedorPuntosJugador.innerText = puntosJugador;
    contenedorPuntosPC.innerText = puntosPC;
    remove(instrucciones);
    remove(mensajeGanador);
}

function remove(elemento){
    elemento.classList.remove("empate");
    elemento.classList.remove("ganador");
    elemento.classList.remove("perdedor");
}

function cambiosImg(elecJ,elecPC){
    contenedorEleccionJugador.src=`./img/${elecJ}.png`;
    contenedorEleccionPC.src=`./img/${elecPC}.png`;
}

function calcularEleccion(eleccion){
    if (eleccion == "piedra"){
        return 0;
    }else if( eleccion == "papel"){
        return 1;
    }else{
        return 2;
    }
}

function calcularGanador(eleccionJ,eleccionPC){
    if (eleccionJ === eleccionPC ){
        mensajeGanador.innerText = "Empate";
        mensajeGanador.classList.add("empate")
    } else if(
    ( eleccionJ === 0 && eleccionPC === 2 ) ||
    ( eleccionJ === 1 && eleccionPC === 0 ) ||
    (eleccionJ === 2 && eleccionPC === 1))
    {
        mensajeGanador.innerText = "Ganaste un punto!";
        mensajeGanador.classList.add("ganador")
        puntosJugador ++;
        contenedorPuntosJugador.innerText = puntosJugador;

    }else{
        puntosPC ++;
        contenedorPuntosPC.innerText = puntosPC;
        mensajeGanador.innerText = "La computadora gano un punto!";
        mensajeGanador.classList.add("perdedor")
    }
}

