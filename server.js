const path = require("path");
const { createServer } = require("http");
const next = require("next");

process.env.NODE_ENV = "production";

const port = Number.parseInt(process.env.PORT || "3000", 10);
const hostname = process.env.HOSTNAME || "0.0.0.0";
const dir = path.resolve(__dirname);
const app = next({ dev: false, dir, hostname, port, conf: { distDir: ".next" } });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((request, response) => {
    handle(request, response);
  }).listen(port, hostname, () => {
    console.log(`Ready on http://${hostname}:${port}`);
  });
});


