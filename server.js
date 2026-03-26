const http = require('http');
//const url = require('url');
const express = require('express');
const app = express();
//const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3001;

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', (req, res) => {
  res.render('../views/pages/index');
});

// about page
app.get('/about', (req, res) => {
  res.render('../views/pages/about');
});

app.listen(port, () => console.log(`Server running at http://${hostname}:${port}/`));

//app.use(express.static('public'));

//const server = http.createServer((req,res) => {
    // --static no html template--
    /*res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1> Project for Weight Sorting System Thesis </h1>\n');*/

    

    // --first routing option (working)--
    /* 
    let filename = "public/";

    if (req.url==="/"){
        filename = filename+'index.html';
    } else if (req.url==="/dashboard") {
        filename = filename+'dashboard.html';
    } else {
        filename = filename+'404.html';
    }

    fs.readFile(filename, (err,data)=> {
        if (err) {
            res.writeHead(500, {"content-type": "text/plain"});
            res.end("Server error");
            return
        } else {
            res.writeHead(filename === '404.html' ? 404:200, {"content-type": "text/html"});
            res.end(data);
        }
    })*/

//});

/*server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});*/