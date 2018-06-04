const apiRouter = require('express').Router();
const v1Router = require('./v1/index.js');
const { signin, signup } = require('../lib/auth');
const jwt = require('jsonwebtoken');

apiRouter.post('/signup', (req, res) => {
  signup(req, res);
});

apiRouter.post('/signin', (req, res) => {
  signin(req, res);
});

apiRouter.use(
  '/v1',
  (req, res, next) => {
    const token = req.get('X-Auth');
    jwt.verify(token, 'mathsecret', (err, decoded) => {
      if (err) {
        res.status(422).json({ message: err });
      } else {
        req.user = decoded;
        next();
      }
    });
  },
  v1Router,
);

module.exports = apiRouter;
