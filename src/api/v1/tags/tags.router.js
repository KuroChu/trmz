const { Router } = require('express');

const tagsRouter = Router();

tagsRouter.get('/', (req, res) => {
  // ... handle GET /tags
});

tagsRouter.put('/', (req, res) => {
  // ... handle PUT /tags
});

tagsRouter.delete('/', (req, res) => {
  // ... handle DELETE /tags
});

module.exports = tagsRouter;
