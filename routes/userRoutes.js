const express = require('express');
const router = express.Router();
const userController = require('../http/controllers/userController')();
const { authMiddleware } = require('../http/middleware/auth');
// const {
//   registerValidation,
//   loginValidation,
// } = require('../http/middleware/validators/userValidator');
const { authorizeRoles } = require('../http/middleware/authorize');

// Register a new user
// router.post('/register', registerValidation, userController.register);
router.post('/register',  userController.register);

// User login
// router.post('/login', loginValidation, userController.login);
router.post('/login', userController.login);

// Get current user's profile
router.get('/profile', authMiddleware, userController.profile);
// router.get('/profile', userController.profile);

// Update current user's profile
router.put('/profile', authMiddleware, userController.updateProfile);
// router.put('/profile', userController.updateProfile);

// Get all users (admin only)
router.get('/', authMiddleware, authorizeRoles('admin'), userController.getAll);
// router.get('/', userController.getAll);

// Delete a user (admin only)
router.delete('/:id', authMiddleware, authorizeRoles('admin'), userController.delete);
// router.delete('/:id', userController.delete);

module.exports = router;
