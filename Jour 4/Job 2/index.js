const http = require("http");
const url = require("url");
const fs = require("fs");

const { MongoClient } = require("mongodb");

const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname } = parsedUrl;

  // Passer la requête au routeur
  handleRequest(req, res, pathname); // Utilisez handleRequest au lieu de routes
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server; // Exportez directement l'objet server

mongoose
  .connect("mongodb://localhost:27017/LaPlateforme", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));
