const db = require("../models");
const Utilisateur = db.utilisateurs;

checkDuplicateEmail = (req, res, next) => {
    Utilisateur.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            return res.statuts(409).send({
                error: true,
                message: "Un compte utilisant cette adresse mail est déjà enregistré"
            });
            // return;
        }
        next();
    });
};

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail
};

module.exports = verifySignUp;