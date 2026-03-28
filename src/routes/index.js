const express = require('express');
const { join } = require('node:path');
const router = express.Router();
const fb = require('../config/firebase');

const { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut
 } = require('../config/firebase');

 const auth = getAuth();

/*const firebaseAuthController = require('../controllers/authController');

router.post('/api/login', firebaseAuthController.loginUser);
router.post('/api/logout', firebaseAuthController.logoutUser);
*/

// LOGIN PAGE
router.get('/', (req, res) => {
  res.render('./pages/index');
});

router.get('/dashboard', (req, res) => {
  res.render('./pages/dashboard');

});

router.get('/records', (req, res) => {
  res.render('./pages/records');

});

router.get('/settings', (req, res) => {
  res.render('./pages/settings');

});

router.get('/logout', (req, res) => {
    res.render('./pages/logout');
});

router.get('/404', (req, res) => {
  res.render('./pages/404');
});

router.post('/api/login', async (req, res) => {
    // console.log(req.body.email);
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({
            email: "Email is required",
            password: "Password is required",
        });
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => { 
        const idToken = userCredential._tokenResponse.idToken
            if (idToken) {
                res.cookie('access_token', idToken, {
                    httpOnly: true
                });
                res.status(200).json({ message: "User logged in successfully", userCredential });
            } else {
                res.status(500).json({ error: "Internal Server Error" });
            }
        })
        .catch((error) => {
            console.error(error);
            const errorMessage = error.message || "An error occurred while logging in";
        });
        //console.log(res.cookie('access_token'));
});

router.post('/api/logout', (req, res) => {
    //console.log(res.cookie('access_token'));
    signOut(auth)
    .then(() => {
        res.clearCookie('access_token');
        res.status(200).json({ message: "User logged out successfully" });
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    });
});

router.post('/add-test', async (req, res) => {
  const customers = fb.database.ref().child("test");
  const primaryKey = "customer_two";

  const res2 = await customers.child(primaryKey).set({
    "firstName": "John Zel",
    "lastName": "Bartolo",
    "location": "from new router"
  });
})

module.exports = router;