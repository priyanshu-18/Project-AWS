const http = require("http");
const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("./certs/server.key"),
  cert: fs.readFileSync("./certs/server.crt"),
};

const secureServer = https.createServer(options, (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });

  res.end(`
    <!doctype html>
    <html>
      <head><title>HTTPS Certificate Demo</title></head>
      <body style="font-family: Arial; padding: 40px;">
        <h1>HTTPS is working</h1>
        <p>This page is encrypted with TLS using a self-signed certificate.</p>
        <p><strong>Secure URL:</strong> https://localhost:8443</p>
      </body>
    </html>
  `);
});

secureServer.listen(8443, () => {
  console.log("HTTPS server: https://localhost:8443");
});

const redirectServer = http.createServer((req, res) => {
  res.writeHead(301, {
    Location: `https://localhost:8443${req.url}`,
  });
  res.end();
});

redirectServer.listen(8080, () => {
  console.log("HTTP redirect: http://localhost:8080");
});