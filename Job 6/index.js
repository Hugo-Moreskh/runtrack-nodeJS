const fs = require("fs");

// Chemin vers le fichier texte
const cheminFichier = "C:/Users/hugo/Documents/runtrack-nodeJS/Job 6/data.txt";

// Récupérer le contenu du fichier de manière synchrone
try {
  const contenuFichier = fs.readFileSync(cheminFichier, "utf-8");
  console.log("Contenu du fichier :", contenuFichier);
} catch (err) {
  console.error("Erreur lors de la lecture du fichier :", err);
}
