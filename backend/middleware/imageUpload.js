const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(
            "Upload Middleware - Requête reçue pour le fichier:",
            file.originalname,
        );
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const filename =
            file.fieldname + "-" + Date.now() + "." + file.originalname.split(".").pop();
        console.log(`Upload Middleware - Nom de fichier généré: ${filename}`);
        cb(null, filename);
        // cb(req, filename);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log(
            "Upload Middleware - Vérification du type de fichier pour:",
            file.originalname,
        );
        // Ajoutez ici des conditions pour vérifier le type de fichier si nécessaire
        cb(null, true); // Accepter le fichier
    },
});

module.exports = upload;
