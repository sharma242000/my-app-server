const adminController = require('../controllers/admin.controller');
const authController = require('../controllers/auth.controller');
const verifyAuth = require('../middleware/auth');

module.exports = (app) => {
    app.get('/admin/users', [verifyAuth.verifyToken, verifyAuth.verifyAdmin], adminController.listUsers);
    app.post('/admin/insert', [verifyAuth.verifyToken, verifyAuth.verifyAdmin], authController.userRegistration);
    app.post('/admin/update', [verifyAuth.verifyToken, verifyAuth.verifyAdmin], adminController.updateUser);
    app.post('/admin/delete', [verifyAuth.verifyToken, verifyAuth.verifyAdmin], adminController.deleteUser);
}