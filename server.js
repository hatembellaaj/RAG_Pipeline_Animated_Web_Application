const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 9001;
const PUBLIC_DIR = path.join(__dirname, 'public');

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
  };
  return map[ext] || 'application/octet-stream';
}

const server = http.createServer((req, res) => {
  const safePath = req.url.split('?')[0];
  const requestedPath = path.join(PUBLIC_DIR, safePath === '/' ? 'index.html' : safePath);
  const filePath = requestedPath.startsWith(PUBLIC_DIR) ? requestedPath : PUBLIC_DIR;

  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(PUBLIC_DIR, 'index.html'), (fallbackErr, fallbackData) => {
        if (fallbackErr) {
          res.writeHead(404);
          res.end('Not Found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fallbackData);
      });
      return;
    }

    res.writeHead(200, { 'Content-Type': getContentType(filePath) });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`RAG animation app running on port ${PORT}`);
});
