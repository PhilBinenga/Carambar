const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Ajoutez cette ligne
const setupSwagger = require('./swagger/swagger'); // Importez votre configuration Swagger
const jokesRouter = require('./routes/jokes');

const app = express();

// Configurez CORS
app.use(cors()); 

app.use(express.json());
setupSwagger(app); // Appelez la fonction pour configurer Swagger
app.use('/blagues', jokesRouter);

mongoose.connect('mongodb://localhost:27017/jokesDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
