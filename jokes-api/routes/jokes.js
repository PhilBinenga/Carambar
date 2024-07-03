const express = require('express');
const Joke = require('../models/joke');
const router = express.Router();

/**
 * @swagger
 * /blagues:
 *   get:
 *     summary: Récupère toutes les blagues
 *     responses:
 *       200:
 *         description: Liste de blagues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   content:
 *                     type: string
 */
router.get('/', async (req, res) => {
  try {
    const jokes = await Joke.find();
    res.json(jokes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /blagues/{id}:
 *   get:
 *     summary: Récupère une blague par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Une seule blague
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 content:
 *                   type: string
 */
router.get('/:id', async (req, res) => {
  try {
    const joke = await Joke.findById(req.params.id);
    if (joke == null) {
      return res.status(404).json({ message: 'Joke not found' });
    }
    res.json(joke);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @swagger
 * /blagues/random:
 *   get:
 *     summary: Récupère une blague aléatoire
 *     responses:
 *       200:
 *         description: Une blague aléatoire
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 content:
 *                   type: string
 */
// GET random joke
// Exemple de route pour obtenir une blague aléatoire
router.get('/blagues/random', async (req, res) => {
  try {
    // Logique pour récupérer une blague aléatoire depuis la base de données
    const randomJoke = await Joke.aggregate([{ $sample: { size: 1 } }]);
    res.json(randomJoke);
  } catch (error) {
    console.error('Error fetching random joke:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



/**
 * @swagger
 * /blagues:
 *   post:
 *     summary: Ajoute une nouvelle blague
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blague ajoutée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 content:
 *                   type: string
 */
router.post('/', async (req, res) => {
  const joke = new Joke({
    content: req.body.content
  });
  try {
    const newJoke = await joke.save();
    res.status(201).json(newJoke);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
