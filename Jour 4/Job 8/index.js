const http = require("http");
const url = require("url");
const readline = require("readline");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

// Schémas et modèles Mongoose
const yearSchema = new mongoose.Schema({
  year: String,
});

const Year = mongoose.model("Year", yearSchema);

const studentSchema = new mongoose.Schema({
  id: Number,
  lastname: String,
  firstname: String,
  students_number: Number,
  year_id: { type: mongoose.Schema.Types.ObjectId, ref: "Year" },
});

const Student = mongoose.model("Student", studentSchema);

// Fonction pour gérer les requêtes HTTP
const handleRequest = (req, res, pathname) => {
  // Logique pour gérer les requêtes
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

mongoose.connect("mongodb://localhost:27017/LaPlateforme").then(() => {
  console.log("Connected to MongoDB...");
  rl.question("Enter student ID to update: ", (studentId) => {
    rl.question("Enter new year ID: ", (newYearId) => {
      Student.updateOne(
        { _id: studentId },
        { year_id: newYearId },
        (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log(result);
          }
          rl.close();
          startServer(); // Démarrer le serveur HTTP une fois readline terminé
        }
      );
    });
  }).catch((err) => console.error("Could not connect to MongoDB...", err));
});

function startServer() {
  const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname } = parsedUrl;

    handleRequest(req, res, pathname);
  });

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  module.exports = server; // Exportez directement l'objet server (après la création du serveur)
}
