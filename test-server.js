const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <html>
      <body>
        <h1>Test Server Working!</h1>
        <p>If you can see this, your networking is fine.</p>
        <p>The issue might be with Next.js configuration.</p>
      </body>
    </html>
  `);
});

server.listen(3001, '127.0.0.1', () => {
  console.log('Test server running on http://127.0.0.1:3001');
});