const express = require('express');
const router = express.Router();

// Ruta base: http://localhost:3001/api/
router.get('/', (req, res) => {
  // #swagger.tags = ['Base']
  res.send('API is running.');
});

// Rutas para los ítems: http://localhost:3001/api/items
const itemRoutes = require('./items');
router.use('/items', itemRoutes);

module.exports = router;
