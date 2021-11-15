const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

const corsOptions = {
  origin: `http://localhost:${PORT}`,
  methods: ['GET', 'POST'],
};

app.use(cors(corsOptions));

app.use('/public', express.static('./public'));

const http = require('http').createServer(app);

const io = require('socket.io')(http, corsOptions);

const time = require('./utils/getTime');

const chatController = require('./controllers/webchat');

io.on('connection', async (socket) => {
  const randomId = socket.id.substr(0, 16);
  chatController.onlineUsers = { ...chatController.onlineUsers, [socket.id]: randomId };

  io.emit('usersOnline', chatController.onlineUsers);

  socket.on('changeNickname', (newNickname) => {
    chatController.onlineUsers[socket.id] = newNickname;
    io.emit('usersOnline', chatController.onlineUsers);
  });

  socket.on('message', async ({ chatMessage, nickname }) => {
    const nick = chatController.getNickname(chatController.onlineUsers, nickname);
    const newMessage = { chat: chatMessage, name: `${nick || nickname}`, timestamp: time() };
    const sendMessage = await chatController.create(newMessage);
    io.emit('message', sendMessage);
  });

  // socket.on('disconnect', () => {
  //   socket.emit('serverMessage', `Xiii! ${socket.id} acabou de se desconectar! :(`);
  // });
});

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', async (_req, res) => {
  const messages = await chatController.getAll();
  res.render('chat', { messages });
});

http.listen(PORT, () => console.log(`API escutando na porta ${PORT}`));
