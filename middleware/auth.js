const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        console.log(req.user);
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
}

const verifyAdmin = (req, res, next) => {
    user = User.findById(req.user._id);
    if (!user || user.username != 'ADMIN') return res.status(401).send('Access denied');
    next();
}

module.exports = {verifyToken, verifyAdmin}