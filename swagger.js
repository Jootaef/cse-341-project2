const swaggerGenerator = require('swagger-autogen')();

// Metadata for the Swagger doc
const swaggerDetails = {
  info: {
    title: 'Inventory API',
    description: 'This documentation describes available endpoints for managing inventory items.'
  },
  host: 'localhost:3001',
  schemes: ['http']
};

// Output file and the entry point of routes
const outputPath = './swagger.json';
const routeFiles = ['./routes/index.js'];

// Run Swagger Autogen to generate the file
swaggerGenerator(outputPath, routeFiles, swaggerDetails);
