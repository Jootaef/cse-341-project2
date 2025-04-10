const router = require("express").Router();
const passport = require("passport");

// Swagger route
router.use("/", require("./swagger"));

// Subroutes
router.use("/items", require("./items"));
router.use("/users", require("./users"));

// GitHub login route
router.get("/login", passport.authenticate("github"), (req, res) => {
  // This function will not be called as the request will be redirected to GitHub for authentication
});

// Logout route
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
