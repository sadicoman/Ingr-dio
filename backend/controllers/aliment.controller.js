const Aliment = require('../models/Aliment');

exports.getAllAliments = async (req, res) => {
    try {
        const aliments = await Aliment.findAll();
        res.status(200).json(aliments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

