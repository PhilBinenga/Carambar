const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const Joke = require('./models/joke'); // Assurez-vous d'avoir ce modèle correctement défini

// Route pour ajouter une blague
app.post('/blagues', async (req, res) => {
  const joke = new Joke({
    content: req.body.content,
  });

  try {
    const newJoke = await joke.save();
    res.status(201).json(newJoke);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour consulter toutes les blagues
app.get('/blagues', async (req, res) => {
  try {
    const jokes = await Joke.find();
    res.json(jokes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour consulter une blague aléatoire
app.get('/blagues/random', async (req, res) => {
  try {
    const count = await Joke.countDocuments();
    if (count === 0) {
      return res.status(404).json({ message: 'No jokes found' });
    }
    const randomIndex = Math.floor(Math.random() * count);
    const randomJoke = await Joke.findOne().skip(randomIndex);
    if (!randomJoke) {
      return res.status(404).json({ message: 'No joke found at random index' });
    }
    res.json(randomJoke);
  } catch (err) {
    console.error('Error fetching random joke:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route pour consulter une blague par ID
app.get('/blagues/_id', async (req, res) => {
  try {
    const joke = await Joke.findById(req.params.id);
    if (!joke) {
      return res.status(404).json({ message: 'Joke not found' });
    }
    res.json(joke);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid joke ID' });
    }
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Middleware pour gérer les erreurs 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
