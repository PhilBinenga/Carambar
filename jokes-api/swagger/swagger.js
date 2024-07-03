const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Définissez les options pour swagger-jsdoc
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Carambar Blagues',
      version: '1.0.0',
      description: 'API pour gérer des blagues',
    },
    servers: [
      {
        url: 'http://localhost:3001', 
      },
    ],
  },
  apis: ['./routes/*.js'], // Chemin vers les fichiers contenant des commentaires Swagger
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
