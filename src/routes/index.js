const express = require('express');
const router = express.Router();

const firebaseAuthController = require('../controllers/authController');

router.post('/api/login', firebaseAuthController.loginUser);
router.post('/api/logout', firebaseAuthController.logoutUser);

module.exports = router;
