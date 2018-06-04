const v1Router = require('express').Router();
const playerRouter = require('./player/index.js');
const clanRouter = require('./clan/index.js');

v1Router.use('/player', playerRouter);
v1Router.use('/clan', clanRouter);

module.exports = v1Router;
