const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { use } = require('express/lib/application');

const verifyToken = (req, res, next) => {
    // next();
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
}

const verifyAdmin = (req, res, next) => {
    User.findById(req.user._id).then(user => {
        if (user.username != 'ADMIN') return res.status(401).send('Access denied');
        next();
    }).catch(err => {return res.status(401).send('Access denied')});
}

module.exports = {verifyToken, verifyAdmin}