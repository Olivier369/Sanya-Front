const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const Utilisateur = db.utilisateurs;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        //
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                error: true,
                message: "Votre token n\'est pas correct"
            });
        }
        req.utilisateurId = decoded.id;
        next();
    });
};

const authJwt = {
    verifyToken: verifyToken
};

module.exports = authJwt;