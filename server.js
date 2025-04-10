const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.json');
const db = require('./data/database');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Auth middleware (exportable if needed)
function isAuthenticated(req, res, next) {
  if (req.session?.user) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized. Please log in.' });
}

// Extended CORS headers for Render

app.use('/', require('./routes'));

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use(bodyParser.json());

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax'
  }
}));

// Passport GitHub strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(passport.initialize());
app.use(passport.session());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Login route
app.get('/login', (req, res) => {
  const loggedOut = req.query.loggedOut === 'true';
  res.send(`
    ${loggedOut ? '<p style="color: green;">🔓 You have successfully logged out.</p>' : ''}
    <h2>🔐 Login with GitHub</h2>
    <a href="/auth/github">
      <button style="padding:10px 20px; font-size:16px;">Login with GitHub</button>
    </a>
  `);
});

// GitHub auth
app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login-failure', session: false }),
  (req, res) => {
    req.session.user = req.user;
    req.session.save(() => {
      res.redirect('/login-success');
    });
  }
);

app.get('/login-success', (req, res) => {
  const user = req.session.user;
  res.send(`
    <h2>✅ Login successful!</h2>
    <p>Welcome, ${user?.displayName || user?.username || 'user'}!</p>
    <a href="/logout">Logout</a>
  `);
});

app.get('/login-failure', (req, res) => {
  res.send('<h2>❌ Login failed. Please try again.</h2>');
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login?loggedOut=true');
  });
});

// Routes
const itemRoutes = require('./routes/items');
const userRoutes = require('./routes/users');

app.use('/items', itemRoutes); // Public GET, protect POST/PUT/DELETE inside
app.use('/users', userRoutes); // Same

app.get('/', (req, res) => {
  res.send('✅ API is running');
});

// MongoDB init
db.initDb((error) => {
  if (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
  } else {
    app.listen(PORT, () => {
      console.log('✅ Connected to MongoDB');
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  }
});
