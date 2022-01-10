module.exports = (sequelize, Sequelize) => {
    const Abonnement = sequelize.define("abonnement", {
        carteId: {
            type: Sequelize.INTEGER
        },
        cvc: {
            type: Sequelize.STRING
        }
    });

    return Abonnement;
}