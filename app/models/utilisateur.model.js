// const { sequelize } = require(".");

// const { Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Utilisateur = sequelize.define("utilisateur", {
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        sexe: {
            type: Sequelize.STRING
        },
        date_naissance: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });

    return Utilisateur;
};