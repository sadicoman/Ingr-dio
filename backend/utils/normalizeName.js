// utils/normalizeName.js
const normalizeName = (name) => {
    return typeof name === "string" ? name.toLowerCase().trim() : "";
};

module.exports = normalizeName;
