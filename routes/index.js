const express = require('express');
const passport = require('passport');
const router = express.Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  res.send('API is running.');
  if (req.session?.user) {
    res.send(`
      <h2>✅ Logged in as ${req.session.user.displayName || req.session.user.username}</h2>
      <a href="/logout">Logout</a>
    `);
  } else {
    res.send(`
      <h2>Welcome to the API</h2>
      <a href="/login">Login with GitHub</a>
    `);
  }
});

router.get('/login', (req, res) => {
  res.redirect('/auth/github');
});

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    req.session.user = req.user;
    req.session.save(() => {
      res.redirect('/');
    });
  }
);

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Failed to log out.' });
    }
    res.redirect('/');
  });
});

// Routes
router.use('/items', require('./items'));
router.use('/users', require('./users')); 

module.exports = router;