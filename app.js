// app.js
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/data') {
    let data = '';

    // Receive data in chunks
    req.on('data', chunk => {
      data += chunk;
    });

    // Process data when complete
    req.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        console.log(`Received message: ${parsedData.message}`);

        // Send a response
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ response: `Server received: ${parsedData.message}` }));
      } catch (error) {
        console.error('Error parsing JSON:', error);
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad Request');
      }
    });
  } else {
    // Handle other requests
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, World!\n');
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
