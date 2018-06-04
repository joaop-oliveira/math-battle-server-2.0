const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const apiRouter = require('./api/index');

io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', (data) => {
    console.log(data);
  });
});

app.use(bodyParser.json());
app.use('/api', apiRouter);

server.listen(3000, () => {
  console.log('listening in port 3000');
});
