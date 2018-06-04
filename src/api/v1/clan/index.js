const clanRouter = require('express').Router();
const { Clan } = require('../../../config/db');

clanRouter.get('/', async (req, res) => {
  const clan = await Clan();
  const clanObj = [];
  clan
    .select()
    .execute((row) => {
      clanObj.push({
        id: row[0],
        name: row[1].trim(),
        master: row[2].trim(),
      });
    })
    .then(() => {
      res.status(202).json(clanObj);
    })
    .catch((error) => {
      res.status(422).json({ message: error });
    });
});

clanRouter.get('/show/:id', async (req, res) => {
  const { id } = req.params;
  const clan = await Clan();
  let clanObj = {};
  clan
    .select()
    .where('id = :id')
    .bind('id', id)
    .execute((row) => {
      clanObj = {
        ...clanObj,
        id: row[0],
        name: row[1].trim(),
        master: row[2].trim(),
      };
    })
    .then(() => {
      res.status(202).json(clanObj);
    })
    .catch((error) => {
      res.status(422).json({ message: error });
    });
});

clanRouter.post('/', async (req, res) => {
  const { name } = req.body;
  const master = req.user.userName;
  const clan = await Clan();
  clan
    .insert(['name', 'master'])
    .values(name, master)
    .execute()
    .then(() => {
      res.status(202).json({ message: `Clan ${name} created with success` });
    })
    .catch((error) => {
      res.status(202).json({ message: error });
    });
});

module.exports = clanRouter;
