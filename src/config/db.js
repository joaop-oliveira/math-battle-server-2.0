const mysqlx = require('@mysql/xdevapi');

const options = {
  host: 'localhost',
  port: 33060,
  password: '221294gt',
  user: 'root',
  schema: 'math-battle',
};

const Player = async () => {
  const session = await mysqlx.getSession(options);
  const schema = session.getSchema('math-battle');
  const player = schema.getTable('players');
  return player;
};

const Clan = async () => {
  const session = await mysqlx.getSession(options);
  const schema = session.getSchema('math-battle');
  const clan = schema.getTable('clans');
  return clan;
};

const Session = async (callback) => {
  const session = await mysqlx.getSession(options);
  const schema = session.getSchema('math-battle');
  callback(schema);
};

module.exports = {
  Clan,
  Player,
  Session,
};
