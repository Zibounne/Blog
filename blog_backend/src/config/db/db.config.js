require('dotenv').config();
const { Sequelize } = require('sequelize');

let dbConnected = false;

////////////////////////// DB | Sequelize | ORM //////////////////////////

// Create a Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

// Function to initialize the database
async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database.');
    dbConnected = true;
    return { dbConnected };
  } catch (err) {
    console.error('Error connecting to the database: ', err.message);
    dbConnected = false;
    return { dbConnected };
  }
}

// Export the initialization function and the Sequelize instance
module.exports = { initializeDatabase, sequelize };