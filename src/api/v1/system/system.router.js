const { Router } = require('express');

const systemRouter = Router();

systemRouter.get('/update', (req, res) => {
  // ... handle GET /system/update
});

systemRouter.get('/health', (req, res) => {
  // ... handle GET /system/health
});

module.exports = systemRouter;
