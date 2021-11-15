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

const http = require('http').createServer(app);

const io = require('socket.io')(http, corsOptions);

require('./controllers/webchat')(io);

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {

});

http.listen(PORT, () => console.log(`API escutando na porta ${PORT}`));
