const express = require("express");
// Reload will auto reload your site.
// App the Express Webserver
const app = express();
const config = require("./server.json");
const routers = require("./routers");

const rateLimit = require("express-rate-limit");
const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
});

app.use(apiLimiter);
app.use("/api", routers);

const serverPort = config.port;

app.listen(serverPort, function () {
  console.log("Listening on port " + serverPort);
});
