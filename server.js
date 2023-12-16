const express = require('express');
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const initRoutes = require('./initRoutes');
const postRoutes = require('./controller/posts');
const authRoutes = require('./controller/auth.controller');
const req = require('express/lib/request');


var STATIC_CHANNELS = [{
    name: 'Global chat',
    participants: 0,
    id: 1,
    sockets: []
}, {
    name: 'Funny',
    participants: 0,
    id: 2,
    sockets: []
}];

require('dotenv').config();


// Connect to MongoDB
// mongoose.connect('mongodb+srv://sharmamohit242000:bteVHLgSvIylnqbN@cluster0.aehyewe.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => logger.info('MongoDB connected'))
//     .catch(err => logger.error(err));

const app = express();

var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

initRoutes(app);


const PORT = 8000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

io.on('connection', (socket) => { // socket object may be used to send specific messages to the new connected client
    console.log('new client connected');
    socket.emit('connection', null);
    socket.on('channel-join', id => {
        console.log('channel join', id);
        STATIC_CHANNELS.forEach(c => {
            if (c.id === id) {
                if (c.sockets.indexOf(socket.id) == (-1)) {
                    c.sockets.push(socket.id);
                    c.participants++;
                    io.emit('channel', c);
                }
            } else {
                let index = c.sockets.indexOf(socket.id);
                if (index != (-1)) {
                    c.sockets.splice(index, 1);
                    c.participants--;
                    io.emit('channel', c);
                }
            }
        });

        return id;
    });
    socket.on('send-message', message => {
        io.emit('message', message);
        console.log("messg");
    });

    socket.on('disconnect', () => {
        STATIC_CHANNELS.forEach(c => {
            let index = c.sockets.indexOf(socket.id);
            if (index != (-1)) {
                c.sockets.splice(index, 1);
                c.participants--;
                io.emit('channel', c);
            }
        });
    });


});

app.get('/getChannels', (req, res) => {
    res.json({
        channels: STATIC_CHANNELS
    })
});