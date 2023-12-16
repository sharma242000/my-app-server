const User = require('../models/User');

// List all users
const listUsers = async (req, res) => {
    const users = await User.find();
    userInfos = users.map(user => {
        return {
            _id: user._id,
            username: user.username
        }
    });
    res.status(200).send(userInfos);
}

module.exports = {listUsers};