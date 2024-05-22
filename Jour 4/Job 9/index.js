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

// Supprimer un étudiant par son id
const deleteStudentById = async (studentId) => {
  try {
    const result = await Student.deleteOne({ id: studentId });
    console.log(result);
    console.log("Student deleted successfully");
  } catch (error) {
    console.error("Error deleting student:", error);
  }
};

// Exemple d'utilisation de la fonction pour supprimer l'étudiant avec id = 1
deleteStudentById(1);
