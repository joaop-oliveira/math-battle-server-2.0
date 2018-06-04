const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Player } = require('../config/db');

const signup = async (req, res) => {
  const {
    fullName, userName, email, password,
  } = req.body;
  const hash = await bcrypt.hash(password, 5);
  const player = await Player();
  await player
    .insert(['full_name', 'user_name', 'email', 'password'])
    .values(fullName, userName, email, hash)
    .execute()
    .then(() => {
      const token = jwt.sign({ userName, email }, 'mathsecret').toString();
      res.set('X-Auth', token);
      res.status(202).json({ ok: true });
    })
    .catch((error) => {
      res.status(422).json({ message: 'could not create user' });
    });
};

const signin = async (req, res) => {
  const { userName, password } = req.body;
  let users = {};
  const player = await Player();
  player
    .select(['id', 'user_name', 'email', 'password'])
    .where('user_name == :user_name')
    .bind('user_name', userName)
    .execute((row) => {
      users = {
        ...users,
        id: row[0],
        userName: row[1].trim(),
        email: row[2].trim(),
        password: row[3],
      };
    })
    .then(async () => {
      const match = await bcrypt.compare(password, users.password);
      if (match) {
        const { email } = users;
        const token = jwt.sign({ userName, email }, 'mathsecret').toString();
        res.set('X-Auth', token);
        res.status(202).json(users);
      } else {
        throw new Error('wrong user or password');
      }
    })
    .catch((error) => {
      res.status(422).json({ message: error });
    });
};

module.exports = {
  signin,
  signup,
};
