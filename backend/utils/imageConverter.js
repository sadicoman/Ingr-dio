const sharp = require("sharp");
const fs = require("fs");

const convertToWebP = async (inputPath, outputPath) => {
    try {
        console.log(`convertToWebP - Conversion de ${inputPath} en ${outputPath}`);
        await sharp(inputPath).toFormat("webp").webp({ quality: 20 }).toFile(outputPath);
        console.log("convertToWebP - Conversion réussie");
        // Optionnel : Supprimer l'image originale si nécessaire
        // fs.unlinkSync(inputPath);
    } catch (error) {
        console.error("convertToWebP - Erreur lors de la conversion de l'image:", error);
        throw error; // Renvoie l'erreur pour une gestion ultérieure
    }
};

module.exports = { convertToWebP };
