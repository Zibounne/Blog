const User = require('../../models/user/user.model');
const bcrypt = require('bcrypt');

////////////////////////// User | Controller //////////////////////////

// Sign Up
exports.signUp = async (req, res) => {
  const { 
    username,
    email,
    password,
    firstname,
    lastname
  } = req.body;

  try {
    // Checking if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating a new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      firstname,
      lastname
    });

    res.status(201).json({
      message: 'User signed up successfully!',
      userId: newUser.id
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during signup ', error: error.message });
  }
};

// Get users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] } // Exclude passwords for security reasons
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users ', error: error.message });
  }
}