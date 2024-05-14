const fs = require("fs");
const cheminFichier = "C:/Users/hugo/Documents/runtrack-nodeJS/Job 6/data.txt";
fs.writeFile(
  cheminFichier,
  "“Je manipule les fichiers avec un module node !”.",
  function (err) {
    if (err) throw err;
    console.log("Fichier mis à jour !");
    try {
      const contenuFichier = fs.readFileSync(cheminFichier, "utf-8");
      console.log("Contenu du fichier :", contenuFichier);
    } catch (err) {
      console.error("Erreur lors de la lecture du fichier :", err);
    }
  }
);
