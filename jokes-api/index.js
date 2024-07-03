const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const jokesRouter = require('./routes/jokes');
const path = require('path');
const cors = require('cors'); // Ajoutez ceci

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.json());

// Enable CORS
app.use(cors()); // Ajoutez ceci

// Routes
app.use('/', jokesRouter);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Swagger setup
const swaggerSetup = require('./swagger/swagger');
swaggerSetup(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
