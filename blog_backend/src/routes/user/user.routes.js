const express = require('express');
const router = express.Router();

// Controller

const userController = require('../../controllers/user/user.controller');

// Middleware

//const userMiddleware = require('../../middlewares/user/user.middleware');

////////////////////////// User | Routes //////////////////////////

router.post('/signUp', userController.signUp);
router.get('/', userController.getUsers);

// Export

module.exports = router;