const express = require('express');
const cors =  require('cors');
const globalRoutes = require('./routes/global.routes');
const { initializeDatabase } = require('./config/db/db.config');

const app = express();
const port = 3000;

////////////////////////// Index //////////////////////////

// Corse
app.use(cors());

// Middleware for JSON requests
app.use(express.json());

// Root route
app.get('/', async (req, res) => {
  const { dbConnected } = await initializeDatabase();
  const dbMessage = dbConnected ? 'DB Connected.' : 'DB not connected.';
  res.send(`Server operational.<br>${dbMessage}`);
  console.log('Server operational.');
});

// Api route
app.use('/api', globalRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});