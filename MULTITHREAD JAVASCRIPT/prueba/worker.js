const { parentPort } = require('worker_threads');

parentPort.on('message', async (task) => {
  console.log("🚀 ~ parentPort.on ~ task:", task)
  try {
    const WorkerPool = require('./WorkerPool.js');
    console.log("------------------->", WorkerPool.mongoClient)
    // const db = mongoClient.db('mi_base_de_datos');
    // const collection = db.collection('mi_coleccion');

    // Ejecutar una operación en MongoDB (por ejemplo, una consulta)
    // const result = await collection.find(task.query).toArray();

    // Enviar el resultado de vuelta al hilo principal
    // parentPort.postMessage(result);
  } catch (error) {
    console.log("🚀 ~ parentPort.on ~ error:", error)
  }
});