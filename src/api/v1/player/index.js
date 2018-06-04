const playerRouter = require('express').Router();
const { Player, Session } = require('../../../config/db');

playerRouter.get('/', async (req, res) => {
  const player = await Player();
  const users = [];
  await player
    .select(['id', 'full_name', 'user_name', 'email'])
    .execute((row) => {
      users.push({
        id: row[0],
        full_name: row[1].trim(),
        user_name: row[2].trim(),
        email: row[3].trim(),
      });
    })
    .then(() => {
      res.status(202).json(users);
    })
    .catch((error) => {
      res.status(422).json({ message: error });
    });
});

playerRouter.get('/show/:id', async (req, res) => {
  const player = await Player();
  const { id } = req.params;
  let users = {};
  player
    .select(['id', 'full_name', 'user_name', 'email'])
    .where('id == :id')
    .bind('id', id)
    .execute((row) => {
      users = {
        ...users,
        id: row[0],
        full_name: row[1].trim(),
        user_name: row[2].trim(),
        email: row[3].trim(),
      };
      res.status(202).json(users);
    })
    .catch((error) => {
      res.status(422).json({ message: 'error' });
    });
});

module.exports = playerRouter;
