const { createServer } = require("http");
const { Server } = require("socket.io");
const fs = require("fs");
const path = require("path");

const httpServer = createServer(function (req, res) {
  if (req.url !== "/") {
    var stream = fs.createReadStream(path.join("public", req.url));
    stream.on("error", function () {
      res.writeHead(404);
      res.end();
    });
    stream.pipe(res);
    return;
  }

  const readStream = fs.createReadStream("./index.html");
  res.writeHead(200, { "Content-type": "text/html" });
  readStream.pipe(res);
});
const io = new Server(httpServer, {});

io.on("connection", (socket) => {
  // ...
});

httpServer.listen(3000);
