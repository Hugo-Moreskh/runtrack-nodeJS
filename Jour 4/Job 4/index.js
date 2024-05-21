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

const years = [
  { year: "Bachelor 1" },
  { year: "Bachelor 2" },
  { year: "Bachelor 3" },
];

Year.insertMany(years)
  .then((insertedYears) => {
    console.log("Years added");

    const year1 = insertedYears[0]._id;
    const year2 = insertedYears[1]._id;
    const year3 = insertedYears[2]._id;

    const students = [
      {
        id: 1,
        lastname: "LeBricoleur",
        firstname: "Bob",
        students_number: 12345,
        year_id: year1,
      },
      {
        id: 2,
        lastname: "Doe",
        firstname: "John",
        students_number: 23456,
        year_id: year2,
      },
      {
        id: 3,
        lastname: "Dupont",
        firstname: "Marine",
        students_number: 34567,
        year_id: year3,
      },
    ];

    return Student.insertMany(students);
  })
  .then(() => console.log("Students added"))
  .catch((err) => console.error("Error adding years or students", err));
