const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.utilisateurs = require("./utilisateur.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.abonnement = require("./abonnement.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.utilisateurs, {
    through: "user_role",
    foreignKey: "roleId",
    otherKey: "utilisateurId"
});

db.utilisateurs.belongsToMany(db.role, {
    through: "user_role",
    foreignKey: "utilisateurId",
    otherKey: "roleId"
});

db.utilisateurs.hasMany(db.abonnement, { as: "abonnements" });
db.abonnement.belongsTo(db.utilisateurs, {
    foreignKey: "utilisateurId",
    as: "utilisateur"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;