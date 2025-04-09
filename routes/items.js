const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const itemsController = require('../controllers/itemsController');
const { isAuthenticated } = require('../middleware/authenticate');

// Public GET routes
router.get('/', itemsController.getAll);
router.get('/:id', itemsController.getSingle);

// Protected POST
router.post(
  '/',
  isAuthenticated,
  [
    body('productType').notEmpty().withMessage('Product type is required'),
    body('productBrand').notEmpty().withMessage('Product brand is required'),
    body('productName').notEmpty().withMessage('Product name is required'),
    body('weightPerUnit').isNumeric().withMessage('Weight must be a number'),
    body('pricePerUnit').isNumeric().withMessage('Price must be a number'),
    body('sellingPrice').isNumeric().withMessage('Selling price must be a number'),
    body('expirationDate').isISO8601().withMessage('Expiration date must be a valid date'),
  ],
  itemsController.createItem
);

// Protected PUT
router.put(
  '/:id',
  isAuthenticated,
  [
    body('productType').notEmpty().withMessage('Product type is required'),
    body('productBrand').notEmpty().withMessage('Product brand is required'),
    body('productName').notEmpty().withMessage('Product name is required'),
    body('weightPerUnit').isNumeric().withMessage('Weight must be a number'),
    body('pricePerUnit').isNumeric().withMessage('Price must be a number'),
    body('sellingPrice').isNumeric().withMessage('Selling price must be a number'),
    body('expirationDate').isISO8601().withMessage('Expiration date must be a valid date'),
  ],
  itemsController.updateItem
);

// Protected DELETE
router.delete('/:id', isAuthenticated, itemsController.deleteItem);

module.exports = router;
