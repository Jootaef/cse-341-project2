// routes/items.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const itemsController = require('../controllers/itemsController');

// GET all items
router.get('/', itemsController.getAll);

// GET a single item by ID
router.get('/:id', itemsController.getSingle);

// POST a new item
router.post(
  '/',
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

// PUT update an item
router.put(
  '/:id',
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

// DELETE an item
router.delete('/:id', itemsController.deleteItem);

module.exports = router;