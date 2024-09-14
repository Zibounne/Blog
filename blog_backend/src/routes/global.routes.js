const express = require('express');
const router = express.Router();

////////////////////////// Route //////////////////////////

/* =========== User =========== */

const userRoutes = require('./user/user.routes');
router.use('/user', userRoutes);

// Export

module.exports = router;