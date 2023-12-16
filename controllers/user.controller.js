const User = require('../models/User');

// List all users
const listUsers = async (req, res) => {
    currId = req.user._id;

    const users = await User.find();
    User.findById(currId).then(currUser => {
        const filteredUsers = users.filter(user => user.username != currUser.username);
        userInfos = filteredUsers.map(user => {
            return {
                id: user._id.toString() + '_' + currId.toString(),
                name: user.username
            }
        });
        res.status(200).send(userInfos);
    }).catch(err => {res.status(400).send('Error getting users')});
    
}

// Get Username
const getUsername = async (req, res) => {
    User.findById(req.user._id).then(user => {
        res.status(200).send({username: user.username});
    }).catch(err => {return res.status(400).send('Error getting username')});
}

module.exports = {listUsers, getUsername};