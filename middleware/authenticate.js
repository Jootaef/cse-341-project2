const isAuthenticated = (req, res, next) => {
  console.log("🔍 Authentication check:");
  console.log("- Session exists:", !!req.session);
  console.log("- Session user:", JSON.stringify(req.session.user, null, 2));
  console.log("- isAuthenticated():", req.isAuthenticated?.());

  if (req.session?.user === undefined) {
    console.log("❌ Authentication failed: No user in session");
    return res.status(401).json("You do not have access.");
  }
  console.log("✅ Authentication successful");
  next();
};

module.exports = {
  isAuthenticated,
};
