const { Router } = require('express');

const urlRouter = Router();

urlRouter.get('/', (req, res) => {
  // ... handle GET /url
});

urlRouter.post('/', (req, res) => {
  // ... handle POST /url
});

urlRouter.delete('/:shortCode', (req, res) => {
  // ... handle DELETE /url/:shortCode
});

module.exports = urlRouter;
