/*Constantes*/
const stopwatch = document.getElementById('stopwatch');
const playPauseButton = document.getElementById('play-pause');
const secondsSphere = document.getElementById('seconds-sphere');

/*Variables*/
let stopwatchInterval;
let runningTime =0;


const playPause = () => {
    const isPause = !playPauseButton.classList.contains('running'); //vemos si esta pausado
    
    if(isPause){ //si esta pausado --iniciar
        playPauseButton.classList.add('running'); //cambiamos el boton de  pause a corriendo
        start();  //iniciamos

    }else{ // si esta corriendo --pausar
        playPauseButton.classList.remove('running'); //cambiamos el boton de corriendo a pause
        pause();
    }
}

const pause = () => {
    secondsSphere.style.animationPlayState = 'paused'; //cambiamos el boton a pause
    clearInterval(stopwatchInterval); //detenemos todo
}

const stop = ()  =>{  //dejamos ttodo como al inicio
    secondsSphere.style.transform = 'rotate(-90deg) translateX(60px)';
    secondsSphere.style.animation = 'none';
    playPauseButton.classList.remove('running'); //cambiamos el boton a detenido
    runningTime =0; //temporizador a 0
    clearInterval(stopwatchInterval);
    stopwatch.textContent = '00:00'
}

const start = () => {  //inicio 
    secondsSphere.style.animation = 'rotacion 60s linear infinite'; //totacion de 60 segundos
    let startTime = Date.now() - runningTime;   //tiempo inicial menos runningTime
    secondsSphere.style.animationPlayState = 'running'; 

    stopwatchInterval = setInterval( () => {
        runningTime = Date.now() - startTime;
        stopwatch.textContent = calculateTime(runningTime);  //actualizamos el minutero
    }, 1000)
 }

 const calculateTime = runningTime => {
    const total_seconds = Math.floor(runningTime / 1000); //calculamos los segundos
    const total_minutes = Math.floor(total_seconds / 60); //calculamos los minutos

    //cuando el segundero llega a 59 vuelve a 00, configuramos para que los valores sean
    //duales ejemolo 01, 02, ect y no 1,2, ect
    const display_seconds = (total_seconds % 60).toString().padStart(2, "0");
    const display_minutes = total_minutes.toString().padStart(2, "0");

    return `${display_minutes}:${display_seconds}`
 }