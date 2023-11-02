const { Router } = require('express');
const urlRouter = require('./url/url.router');
const tagsRouter = require('./tags/tags.router');
const visitsRouter = require('./visits/visits.router');
const systemRouter = require('./system/system.router');

const v1Router = Router();

v1Router.use('/url', urlRouter);
v1Router.use('/tags', tagsRouter);
v1Router.use('/visits', visitsRouter);
v1Router.use('/system', systemRouter);

module.exports = v1Router;
