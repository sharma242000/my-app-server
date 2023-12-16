const userController = require('../controllers/user.controller');
const verifyAuth = require('../middleware/auth');

module.exports = (app) => {
    app.get('/user/users', verifyAuth.verifyToken, userController.listUsers);
}