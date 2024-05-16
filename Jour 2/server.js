const http = require("http");
const url = require("url");
const fs = require("fs");
const handleRequest = require("./routes"); // Assurez-vous que le nom du fichier est correct

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname } = parsedUrl;

  // Passer la requête au routeur
  handleRequest(req, res, pathname); // Utilisez handleRequest au lieu de routes
});

module.exports = server; // Exportez directement l'objet server
