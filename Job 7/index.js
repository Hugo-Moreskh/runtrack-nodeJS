const fs = require("fs");

// Chemin du fichier à lire
const cheminFichier = "C:/Users/hugo/Documents/runtrack-nodeJS/Job 6/data.txt";

// Lire le contenu du fichier de manière asynchrone
fs.readFile(cheminFichier, "utf8", (err, data) => {
  if (err) {
    console.error("Erreur lors de la lecture du fichier :", err);
    return;
  }

  // Afficher le contenu du fichier dans la console
  console.log("Contenu du fichier :");
  console.log(data);
});
