const Router = require('express');
const router = new Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');
const { registrationSchema, loginSchema } = require('../helpers/schemas');

router.post('/registration', validationMiddleware(registrationSchema), userController.registration);
router.post('/login', validationMiddleware(loginSchema), userController.login);
router.get('/auth', authMiddleware, userController.check);

module.exports = router;