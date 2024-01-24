const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('InventoryManagement.json'); // Change to your JSON file
const middlewares = jsonServer.defaults();

const PORT = 3001;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom route to handle POST requests
server.post('/inventoryItems', (req, res, next) => {
  const inventoryItems = router.db.get('inventoryItems');
  const newItem = req.body;
  inventoryItems.push(newItem);
  router.db.set('inventoryItems', inventoryItems).write();
  res.json(newItem);
});

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
