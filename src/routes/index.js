const express = require('express');
const { join } = require('node:path');
const router = express.Router();

/*const firebaseAuthController = require('../controllers/authController');

router.post('/api/login', firebaseAuthController.loginUser);
router.post('/api/logout', firebaseAuthController.logoutUser);

*/

// LOGIN PAGE
router.get('/', async (req, res) => {
  res.send('index');
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

router.get('/404', (req, res) => {
  res.render('404');
});

router.post('/add-test', async (req, res) => {
  const customers = fb.database.ref().child("test");
  const primaryKey = "customer_two";

  const res2 = await customers.child(primaryKey).set({
    "firstName": "John Zel",
    "lastName": "Bartolo",
    "location": "new router check"
  });
  
})

module.exports = router;