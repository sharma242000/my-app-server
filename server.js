const express = require('express');
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const initRoutes = require('./initRoutes');
require('dotenv').config();


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => logger.info('MongoDB connected'))
    .catch(err => logger.error(err));

const app = express();

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