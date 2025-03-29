const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.json');
const db = require('./data/database');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Swagger Docs (accessible at /api/docs)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 👇 Main routes WITHOUT the /api prefix
const mainRoutes = require('./routes');
app.use('/', mainRoutes);

// Connect to MongoDB and start server
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
