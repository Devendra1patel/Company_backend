const express = require('express');
const router = express.Router();
const serviceController = require('../http/controllers/serviceController')();
const { authMiddleware } = require('../http/middleware/auth');
const { authorizeRoles } = require('../http/middleware/authorize');
// const {
//   createServiceValidation,
//   updateServiceValidation,
// } = require('../http/middleware/validators/serviceValidator');

// Public Routes
// Get all services
router.get('/', serviceController.getAll);

// Get a service by slug
router.get('/slug/:slug', serviceController.getBySlug);

// Get a service by ID
router.get('/:id', serviceController.getById);

// Protected Routes (Admin Only)
// Create a new service
// router.post( '/', authMiddleware, authorizeRoles('admin'), createServiceValidation, serviceController.create);
router.post( '/', authMiddleware, authorizeRoles('admin'), serviceController.create);

// Update a service
// router.put('/:id', authMiddleware, authorizeRoles('admin'), updateServiceValidation, serviceController.update);
router.put('/:id', authMiddleware, authorizeRoles('admin'), serviceController.update);

// Delete a service
router.delete('/:id',  authMiddleware, authorizeRoles('admin'), serviceController.delete);

module.exports = router;
