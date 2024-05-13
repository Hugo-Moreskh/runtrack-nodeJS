const fs = require("fs");

// Chemin du fichier à lire
const cheminFichier = "C:/Users/hugo/Documents/runtrack-nodeJS/Job 6/data.txt";

// Lire le contenu du fichier de manière asynchrone
fs.readFile(cheminFichier, "utf8", (err, data) => {
  if (err) {
    console.error("Erreur lors de la lecture du fichier :", err);
    return;
  }

  let contenu = "";
  for (let i = 0; i < data.length; i += 2) {
    contenu += data[i];
  }

  // Afficher le contenu du fichier en prenant une lettre sur deux
  console.log("Contenu du fichier avec une lettre sur deux :");
  console.log(contenu);
});
