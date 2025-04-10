const express = require("express");
const passport = require("passport");
const router = express.Router();

router.use("/", require("./swagger"));

router.get("/login", (req, res) => {
  res.redirect("/auth/github");
});

router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/", session: true }),
  (req, res) => {
    // ✅ Passport logs the user in and serializes it into the session
    req.logIn(req.user, (err) => {
      if (err) {
        console.error("❌ Error during req.logIn:", err);
        return res.status(500).send("Login error");
      }

      // ✅ Now you can safely store the user manually if needed
      req.session.user = req.user;

      // ✅ Save the session to persist it
      req.session.save(() => {
        console.log("✅ Login successful, session saved");
        res.redirect("/");
      });
    });
  }
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("connect.sid"); // Optional: clear cookie
      res.redirect("/");
    });
  });
});

// Routes
router.use("/items", require("./items"));
router.use("/users", require("./users"));

module.exports = router;
