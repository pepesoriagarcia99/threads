const { Worker } = require('worker_threads');

class WorkerPool {
  constructor(size) {
    console.log("🚀 ~ WorkerPool ~ constructor ~ size:", size)
    this.pool = [];
    this.queue = [];
    this.mongoClient = null; // Instancia de cliente compartida

    for (let i = 0; i < size; i++) {
      this.createWorker();
    }
  }

  // Crear un worker y asignarlo a la pool
  createWorker() {
    const worker = new Worker('./worker.js');
    worker.on('message', (message) => {
      console.log("🚀 ~ WorkerPool ~ worker.on ~ message:", message)
    //   if (this.queue.length > 0) {
    //     const task = this.queue.shift();
    //     this.assignTask(worker, task);
    //   } else {
    //     this.pool.push(worker); // Devolver el worker a la pool si no hay más tareas
    //   }
    });

    this.pool.push(worker);
  }

  // Asignar una tarea al worker
  assignTask(worker, task) {
    worker.postMessage(task);
  }

  // Encolar tareas
  execute(task) {
    console.log("🚀 ~ WorkerPool ~ execute ~ task:", task)
    console.log("🚀 ~ WorkerPool ~ execute ~ this.pool:", this.pool.length)
    
    if (this.pool.length > 0) {
      const worker = this.pool.pop();
      this.assignTask(worker, task);
    } else {
      this.queue.push(task);
      
    }
  }

  // Inicializar la conexión a MongoDB una vez
  initMongoDB() {
    
    // const { MongoClient } = require('mongodb');
    // const url = 'mongodb://localhost:27017';
    this.mongoClient = 'Instancia de cliente de MongoDB';
    console.log("🚀 ~ WorkerPool ~ initMongoDB ~ this.mongoClient:", this.mongoClient)
    // await this.mongoClient.connect();
    // console.log('MongoDB conectado');
  }
}

module.exports = WorkerPool;
