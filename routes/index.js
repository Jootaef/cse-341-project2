const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('API is running.');
});

const itemRoutes = require('./items');
router.use('/items', itemRoutes);

const userRoutes = require('./users'); 
router.use('/users', userRoutes);     

module.exports = router;
