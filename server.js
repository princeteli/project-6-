
// require http , fs , path module
var http = require("http");
const fs = require("fs");
const path = require("path");

// port number
let PORT = 3000;

// Utility function to serve pages
const servePage = (res, filePath, contentType, statusCode = 200) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
        // Handle file read error
      res.writeHead(500);
      res.end("Server Error");
    } else {
                  // Send file with correct content type and status
      res.writeHead(statusCode, { "Content-Type": contentType });
      res.end(data);
    }
  });
};

// creating a http server
const server = http.createServer(function (req, res) {
  const url = req.url;

  switch (url) {
    case "/":
    case "/home":
      servePage(res, "./pages/home.html", "text/html");
      break;
    case "/service":
      servePage(res, "./pages/home.html", "text/html");
      break;
    case "/about":
      servePage(res, "./pages/about.html", "text/html");
      break;
    case "/contact":
      servePage(res, "./pages/contact.html", "text/html");
      break;
    case "/style.css":
      // Serve CSS file
      servePage(res, "./public/style.css", "text/css");
      break;
    default:
         // Handle 404 not found  (error handling )
      servePage(res, "./pages/404.html", "text/html", 404);
  }
});


// server listening
server.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

