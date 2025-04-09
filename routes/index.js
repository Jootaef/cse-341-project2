const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('API is running.');
});

const itemRoutes = require('./items');
router.use('/items', itemRoutes);

const userRoutes = require('./users'); 
router.use('/users', userRoutes);     

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/'); // Redirect to home page after logout
  });
});




module.exports = router;
