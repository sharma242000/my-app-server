const authController = require('../controller/auth.controller');

module.exports = (app) => {
    app.post('/user/auth/register', authController.userRegistration);
    app.post('/user/auth/login', authController.userLogin);
}