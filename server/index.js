const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const PORT = 5000 || process.env.PORT;
const router = require("./router");

app.use(router);

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
