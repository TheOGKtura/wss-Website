const http = require('http');
const path = require('path');
const express = require('express');

const app = express();
const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Docker Project for Weight Sorting System Thesis\n');
});

// routing path/login page
app.get('/', (req, res) => {
  res.send('Login');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

app.use('/static', express.static(path.join(__dirname, '../public')));