const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const usersController = require('../controllers/usersController');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);

router.post(
  '/',
  [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('favoriteColor').notEmpty().withMessage('Favorite color is required'),
    body('birthday').isISO8601().withMessage('Valid birthday is required')
  ],
  usersController.createUser
);

router.put(
  '/:id',
  [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('favoriteColor').notEmpty().withMessage('Favorite color is required'),
    body('birthday').isISO8601().withMessage('Valid birthday is required')
  ],
  usersController.updateUser
);

router.delete('/:id', usersController.deleteUser);

module.exports = router;
