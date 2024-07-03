const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Jokes API',
      version: '1.0.0',
      description: 'A simple Express API for jokes',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Change this to your server's URL if different
      },
    ],
  },
  apis: ['./routes/*.js'], // Change this to the path where your route files are located
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const swaggerSetup = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = swaggerSetup;
