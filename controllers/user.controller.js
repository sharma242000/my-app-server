const User = require('../models/User');

// List all users
const listUsers = async (req, res) => {
    currId = req.user._id;
    currUser = User.findById(currId);

    const users = await User.find();
    const filteredUsers = users.filter(user => user.username != currUser.username);

    userInfos = filteredUsers.map(user => {
        return {
            id: user._id.toString() + '_' + currId.toString(),
            name: user.username
        }
    });
    res.status(200).send(userInfos);
}

// Get Username
const getUsername = async (req, res) => {
    currUser = User.findById(req.user._id);
    res.status(200).send({username: currUser.username});
}

module.exports = {listUsers, getUsername};