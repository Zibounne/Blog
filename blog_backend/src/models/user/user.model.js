const { DataTypes, STRING } = require('sequelize');
const sequelize = require('../../config/db/db.config').sequelize;

////////////////////////// User | Model //////////////////////////

// User
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [3, 25]
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [6, 100]
    }
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isValidLength(value) {
        if (value && (value.length < 3 || value.length > 25)) {
          throw new Error('Firstname must be between 3 and 25 characters long, or empty.');
        }
      }
    }
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isValidLength(value) {
        if (value && (value.length < 3 || value.length > 25)) {
          throw new Error('Lastname must be between 3 and 25 characters long, or empty.');
        }
      }
    }
  }
}, {
  tableName: 'users',
  timestamps: true
});

// Synchronize model with database
User.sync();

// Export
module.exports = User;