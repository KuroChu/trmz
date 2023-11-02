const { Router } = require('express');

const visitsRouter = Router();

visitsRouter.get('/', (req, res) => {
  // ... handle GET /visits
});

visitsRouter.get('/all', (req, res) => {
  // ... handle GET /visits/all
});

visitsRouter.get('/lost', (req, res) => {
  // ... handle GET /visits/lost
});

module.exports = visitsRouter;
