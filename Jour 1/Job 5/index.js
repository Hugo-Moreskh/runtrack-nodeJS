const path = require("path");

const cheminFichier = "C:/Users/hugo/Documents/runtrack-nodeJS/Job 5/index.js";

const nomFichier = path.basename(cheminFichier);
const extFichier = path.extname(cheminFichier);
const nomDossier = path.dirname(cheminFichier);

console.log(nomFichier, extFichier, nomDossier);
