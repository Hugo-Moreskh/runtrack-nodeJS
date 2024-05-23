const http = require("http");
const url = require("url");
const fs = require("fs");

const mongoose = require("mongoose");
const { stringify } = require("querystring");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname } = parsedUrl;

  // Passer la requête au routeur
  handleRequest(req, res, pathname);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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
  id: { type: Number, require: true },
  lastname: { type: String, require: true },
  firstname: { type: String, require: true },
  students_number: { type: Number, require: true },
  year_id: { type: mongoose.Schema.Types.ObjectId, ref: "Year", require: true },
});

const Student = mongoose.model("Student", studentSchema);

// Function to handle requests
const handleRequest = async (req, res, pathname) => {
  if (pathname === "/export") {
    await exportData(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
};

// Function to export data
const exportData = async (req, res) => {
  try {
    const students = await Student.find().populate("year_id").exec();
    const jsonData = JSON.stringify(students, null, 2);

    fs.writeFile("students.json", jsonData, (err) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error writing file");
        return;
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(jsonData);
    });
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Error exporting data");
  }
};
