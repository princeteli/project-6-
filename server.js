const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// MIME types for different files
const mimeTypes = {
  '.html': 'text/html',
};

// Helper function to serve files
const serveFile = (filePath, contentType, res, statusCode = 200) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
    } else {
      res.writeHead(statusCode, { 'Content-Type': contentType });
      res.end(data);
    }
  });
};

const server = http.createServer((req, res) => {
  console.log(`Request for: ${req.url}`);

  let filePath = '';
  let extName = '';

  if (req.url === '/' || req.url === '/home') {
    filePath = path.join(__dirname, 'pages', 'home.html');
    extName = '.html';
  } else if (req.url === '/about') {
    filePath = path.join(__dirname, 'pages', 'about.html');
    extName = '.html';
  } else if (req.url === '/contact') {
    filePath = path.join(__dirname, 'pages', 'contact.html');
    extName = '.html';
  } else if (req.url === '/style.css') {
    filePath = path.join(__dirname, 'public', 'style.css');
    extName = '.css';
  } else {
    filePath = path.join(__dirname, 'pages', '404.html');
    extName = '.html';
    serveFile(filePath, mimeTypes[extName], res, 404);
    return;
  }

  const contentType = mimeTypes[extName] || 'application/octet-stream';
  serveFile(filePath, contentType, res);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
