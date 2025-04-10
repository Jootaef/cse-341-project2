// InKcyIQCOiESzszP
// esnuestronombre
//connection string / collection name databse name
// mongodb+srv://esnuestronombre:<password>@cluster0.06d3ea4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const express = require("express");
const app = express();
const mainRouter = require("./routes/index");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;
const mongodb = require("./db/database");
const cors = require("cors");
const port = process.env.PORT || 3000;

// test
// app.get("/", (req, res) => {
//   res.send("Hello I am Jose");
// });

mongodb.initDb((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("DataBase Running at port: " + port);
  }
});

app
  .use(bodyParser.json())
  .use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
    })
  )
  // this is the basic express session({..}) initialization.
  .use(passport.initialize())
  // init passport on every route call.
  .use(passport.session())
  // allow passport to usee "express-session"
  // routes will work across sites
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, x-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
  })
  .use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }))
  .use(cors({ origin: "*" }))
  // Here I am calling:  app.use("/", mainRouter.router);
  .use("/", mainRouter);

// Here is the github access
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ githubId: profile.id }, function(err, user){
      return done(null, profile);
      // }):
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// endpoints of the session

app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `logged in as ${req.session.user.displayName}`
      : "Logged out"
  );
});
app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api/docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

// Exceptions to handle errors in my code, program wont stop but it continure running, like a catch all on a log
process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
  );
});

// I make it to listen
app.listen(port);
console.log("Web server is listening at port: " + port);
module.exports = app;
