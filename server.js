const http = require('http');
const url = require('url');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const fb = require('./firebase.js');

const hostname = '127.0.0.1';
const port = 3001;
const viewspath = "../views/";

// REST Client extension important for testing VS Code
app.use(express.json())
app.use(cookieParser())
app.use(express.static(__dirname + '/public')); 
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
// 'partials' are dynamic templates, 'pages' are "static pages" that can include partials

app.get('/', (req, res) => {
  res.render(viewspath+'pages/index');
});

app.get('/dashboard', (req, res) => {
  res.render(viewspath+'pages/dashboard');
});

app.get('/404', (req, res) => {
  res.render(viewspath+'pages/404');
});

app.post('/add-test', async (req, res) => {
  const customers = fb.database.ref().child("customers");
  const primaryKey = "customer_two";

  const res2 = await customers.child(primaryKey).set({
    "firstName": "John Zel",
    "lastName": "Bartolo",
    "location": "University of the East"
  });
  
})

app.listen(port, () => console.log(`Server running at http://${hostname}:${port}/`));