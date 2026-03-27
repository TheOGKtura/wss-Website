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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public')); 

app.set("view engine", "ejs");
// use res.render to load up an ejs view file
// 'partials' are dynamic templates, 'pages' are "static pages" that can include partials

app.listen(PORT, () => console.log(`Server running at http://${hostname}:${PORT}/`));