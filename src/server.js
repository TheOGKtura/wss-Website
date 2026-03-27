const express = require('express');
const cookieParser = require('cookie-parser');
const router = require("./routes");
// const fb = require('./config/firebase.js');
const hostname = '127.0.0.1';
const PORT = process.env.PORT || 8080;

// REST Client extension important for testing VS Code
const app = express();
app.use(router);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname + '/public')); 
// use res.render to load up an ejs view file
// 'partials' are dynamic templates, 'pages' are "static pages" that can include partials
/*
// LOGIN PAGE
app.get('/', async (req, res) => {
  res.render('index');
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

app.get('/404', (req, res) => {
  res.render('404');
});

app.post('/add-test', async (req, res) => {
  const customers = fb.database.ref().child("test");
  const primaryKey = "customer_two";

  const res2 = await customers.child(primaryKey).set({
    "firstName": "John Zel",
    "lastName": "Bartolo",
    "location": "new router check"
  });
  
})
*/
app.listen(PORT, () => console.log(`Server running at http://${hostname}:${PORT}/`));