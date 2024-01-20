const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const PORT = 3001;

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

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});

