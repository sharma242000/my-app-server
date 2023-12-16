const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
require('dotenv').config();


const app = express();
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://sharmamohit242000:bteVHLgSvIylnqbN@cluster0.aehyewe.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));