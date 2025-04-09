// middleware/authenticate.js
function isAuthenticated(req, res, next) {
  if (req.session?.user) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized. Please log in.' });
}

module.exports = { isAuthenticated };
