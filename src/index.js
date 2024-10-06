const { spawn } = require('child_process');
const ThreadModule = require('./Thread.cpp');
console.log("🚀 ~ ThreadModule:", ThreadModule)

// Crear el proceso hijo
const child = spawn('node', ['child.js']);
const childPid = child.pid;

// Crear la instancia de la clase Thread y pasarle el PID del proceso hijo
const thread = new ThreadModule.Thread(childPid);

// Enviar una señal al proceso hijo después de cierto tiempo
setTimeout(() => {
    console.log(`Enviando señal al proceso hijo con PID ${childPid}`);
    thread.send();
}, 2000);

// Escuchar la respuesta del proceso hijo
child.on('message', (msg) => {
    console.log('Mensaje del proceso hijo:', msg);
});

child.on('exit', (code, signal) => {
    console.log(`Proceso hijo terminó con el código ${code} y la señal ${signal}`);
});