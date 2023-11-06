const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false, // true pour le port 465, false pour les autres ports
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    tls: {
        // Ne pas échouer sur les certificats non valides
        rejectUnauthorized: false,
    },
});

const sendEmail = (to, subject, html) => {
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: to,
        subject: subject,
        html: html,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error("Erreur lors de l’envoi de l’e-mail:", error);
            return;
        }
        console.log("Email envoyé: " + info.response);
    });
};

module.exports = sendEmail;
