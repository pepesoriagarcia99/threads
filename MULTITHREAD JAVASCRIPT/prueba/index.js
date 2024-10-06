const WorkerPool = require("./WorkerPool");
const pool = new WorkerPool(4); 
pool.initMongoDB();

// Asignar una tarea a la pool
pool.execute({ query: { nombre: "ejemplo" } });

// Ejecutar más tareas
pool.execute({ query: { edad: { $gt: 30 } } });

// Cerrar la conexión de MongoDB cuando sea necesario
process.on("SIGINT", async () => {
  process.exit();
});
