const http = require('http');
const fs = require('fs');
const path = require('path');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Construct the file path
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

  // Determine the file extension
  const extname = path.extname(filePath);

  // Define the content type based on the file extension
  let contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.svg': // Add .svg type handling
      contentType = 'image/svg+xml';
      break;
    default:
      contentType = 'text/html';
  }

  // Read and serve the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // If file not found, return 404
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Not Found</h1>', 'utf-8');
      } else {
        // Other server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`, 'utf-8');
      }
    } else {
      // Success, serve the file with the correct content type
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Set the port number
const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
