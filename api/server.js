const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('Schedule.json');
const middlewares = jsonServer.defaults();

const PORT = 4000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom route to handle POST requests
server.post('/tasks', (req, res, next) => {
  const tasks = router.db.get('tasks');
  const newTask = req.body;
  tasks.push(newTask);
  router.db.set('tasks', tasks).write();
  res.json(newTask);
});

// Custom route to handle DELETE requests for a specific task
server.delete('/tasks/:taskId', (req, res, next) => {
  const tasks = router.db.get('tasks');
  const taskId = req.params.taskId;

  console.log('Received request to delete task with ID:', taskId);

  // Remove the task with the specified taskId
  const updatedTasks = tasks.filter(task => task.id !== taskId);

  console.log('Updated tasks array:', updatedTasks);

  router.db.set('tasks', updatedTasks).write();
  res.json({ message: 'Task deleted successfully' });
});

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
