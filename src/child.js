// child.js
process.on('SIGUSR1', () => {
    console.log('Proceso hijo: Señal SIGUSR1 recibida');
    process.send('Señal SIGUSR1 recibida');
});