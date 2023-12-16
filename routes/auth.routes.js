const authController = require('../controllers/auth.controller');

module.exports = (app) => {
    app.post('/auth/register', authController.userRegistration);
    app.post('/auth/login', authController.userLogin);
}