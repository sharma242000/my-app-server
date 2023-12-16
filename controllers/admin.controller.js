const User = require('../models/User');
const logger = require('../utils/logger');

// List all users
const listUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).send(users);
}

// Update user
const updateUser = async (req, res) => {
    const { username, password } = req.body;
    
    // Check if user is valid
    const userExists = await User.findOne({ username });
    if (!userExists) return res.status(400).send('User does not exists');

    User.updateOne({ username }, { password }, (err, result) => {
        if (err){
            logger.error(err);
            return res.status(400).send('Error updating user');
        }
        res.status(200).send('User updated');
    });
}

// Delete user
const deleteUser = async (req, res) => {
    const { username, password } = req.body;

    // Check if user is valid
    const userExists = await User.findOne({ username });
    if (!userExists) return res.status(400).send('User does not exists');

    User.deleteOne({ username }, (err, result) => {
        if (err){
            logger.error(err);
            return res.status(400).send('Error deleting user');
        }
        res.status(200).send('User deleted');
    });
}

module.exports = {listUsers, updateUser, deleteUser};