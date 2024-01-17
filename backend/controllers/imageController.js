const path = require("path");
const { convertToWebP } = require("../utils/imageConverter");
const upload = require("../middleware/imageUpload");

exports.uploadAndConvertImage = (req, res) => {
    upload.single("image")(req, res, async (error) => {
        if (error) {
            return res
                .status(500)
                .send("Erreur lors du téléchargement de l'image: " + error.message);
        }

        if (!req.file) {
            return res.status(400).send("Aucune image fournie");
        }

        const inputPath = req.file.path;
        const outputPath = path.join(
            __dirname,
            "../uploads/destination",
            req.file.filename + ".webp",
        );

        try {
            await convertToWebP(inputPath, outputPath);
            res.status(200).send({
                message: "Image téléchargée et convertie avec succès",
                path: outputPath,
            });
        } catch (err) {
            res.status(500).send(
                "Erreur lors de la conversion de l'image: " + err.message,
            );
        }
    });
};
