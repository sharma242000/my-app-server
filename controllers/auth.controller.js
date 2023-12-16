const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// Register
const userRegistration = async (req, res) => {
    const { username, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).send('User already exists');

    const user = new User({ username, password });
    await user.save();

    res.status(200).send('User registered');
}

// Login
const userLogin = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Invalid credentials');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.header('Authorization', token).status(200).send(token);
}

module.exports = {userRegistration, userLogin};