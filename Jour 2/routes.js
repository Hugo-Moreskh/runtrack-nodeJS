const fs = require("fs");
const tasksData = require("./data.json");
const url = require("url");

function handleRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const { pathname } = parsedUrl;

  switch (req.method) {
    case "GET":
      if (pathname === "/tasks") {
        getTasks(req, res);
      } else {
        notFound(res);
      }
      break;
    case "POST":
      if (pathname === "/tasks") {
        createTask(req, res);
      } else {
        notFound(res);
      }
      break;
    case "PUT":
      if (pathname.startsWith("/tasks/")) {
        updateTask(req, res, pathname);
      } else {
        notFound(res);
      }
      break;
    case "DELETE":
      if (pathname.startsWith("/tasks/")) {
        deleteTask(req, res, pathname);
      } else {
        notFound(res);
      }
      break;
    default:
      methodNotAllowed(res);
  }
}

function getTasks(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(tasksData.tasks));
}

function createTask(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const newTask = JSON.parse(body);
    newTask.id = tasksData.tasks.length + 1; // Générez un ID unique pour la nouvelle tâche
    tasksData.tasks.push(newTask);
    fs.writeFile("./data.json", JSON.stringify(tasksData, null, 4), (err) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ error: "Erreur lors de la création de la tâche." })
        );
        return;
      }
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newTask));
    });
  });
}

function updateTask(req, res, pathname) {
  const taskId = parseInt(pathname.split("/")[2]);
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const updatedTask = JSON.parse(body);
    const index = tasksData.tasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      tasksData.tasks[index] = { ...tasksData.tasks[index], ...updatedTask };
      fs.writeFile("./data.json", JSON.stringify(tasksData, null, 4), (err) => {
        if (err) {
          console.error(err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              error: "Erreur lors de la mise à jour de la tâche.",
            })
          );
          return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(tasksData.tasks[index]));
      });
    } else {
      notFound(res);
    }
  });
}

function deleteTask(req, res, pathname) {
  const taskId = parseInt(pathname.split("/")[2]);
  const index = tasksData.tasks.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    tasksData.tasks.splice(index, 1);
    fs.writeFile("./data.json", JSON.stringify(tasksData, null, 4), (err) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error: "Erreur lors de la suppression de la tâche.",
          })
        );
        return;
      }
      res.writeHead(204, { "Content-Type": "application/json" });
      res.end();
    });
  } else {
    notFound(res);
  }
}

function notFound(res) {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Page not found" }));
}

function methodNotAllowed(res) {
  res.writeHead(405, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Method Not Allowed" }));
}

module.exports = handleRequest;
