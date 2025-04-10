const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));

// router.get('/login', passport.authenticate('github'));

// router.get('/auth/github/callback',
//   passport.authenticate('github', { failureRedirect: '/login-failure' }),
//   (req, res) => {
//     req.session.user = req.user;
//     req.session.save(() => {
//       res.redirect('/login-success');
//     });
//   }
// );

router.get('/logout', (req, res) => {
  console.log('📣 Logout requested');
  
  // Primero desloguear con passport
  req.logout((err) => {
    if (err) {
      console.error('❌ Error during logout:', err);
      return res.status(500).send('Error during logout');
    }
    
    // Luego destruir la sesión
    req.session.destroy((err) => {
      if (err) {
        console.error('❌ Error destroying session:', err);
        return res.status(500).send('Error destroying session');
      }
      console.log('✅ Logout successful');
      res.redirect('/');
    });
  });
});

router.use('/users', require('./users'));
router.use('/items', require('./items'));

module.exports = router;