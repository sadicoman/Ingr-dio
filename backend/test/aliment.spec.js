const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../server");
// Configurez chai
chai.use(chaiHttp);

describe("Tests unitaires pour le contrôleur des aliments", function () {
    // réinitialiser l'état de votre base de données
    beforeEach(function (done) {
        // Réinitialisation de la base de données
        done();
    });

    // Test de la création d'un aliment
    describe("POST /aliments", function () {
        it("devrait créer un nouvel aliment", function (done) {
            let aliment = {
                Nom: "Pomme",
            };
            chai.request(app)
                .post("/aliments")
                .send(aliment)
                .end(function (err, res) {
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an("object");
                    expect(res.body).to.have.property("Nom").eql("pomme");
                    done();
                });
        });

        it("ne devrait pas créer un aliment sans le nom", function (done) {
            let aliment = {};
            chai.request(app)
                .post("/aliments")
                .send(aliment)
                .end(function (err, res) {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property("errors");
                    done();
                });
        });
    });

    // Test de la récupération de tous les aliments
    describe("GET /aliments", function () {
        it("devrait récupérer tous les aliments", function (done) {
            chai.request(app)
                .get("/aliments")
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    done();
                });
        });
    });

    // Test de la suppression d'un aliment
    describe("DELETE /aliments/:id", function () {
        it("devrait supprimer un aliment", function (done) {
            // Supposons que l'aliment avec l'ID 1 existe
            const alimentId = 1;
            chai.request(app)
                .delete("/aliments/" + alimentId)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body)
                        .to.have.property("message")
                        .eql("Aliment supprimé avec succès.");
                    done();
                });
        });
    });
});
