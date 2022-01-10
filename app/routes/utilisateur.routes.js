const { verifySignUp } = require("../middleware");
const controller = require("../controllers/utilisateur.controller");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accpet"
        );
        next();
    });

    app.post(
        "/api/auth/register",
        // [
        //     verifySignUp.checkDuplicateEmail
        // ],
        controller.create
    );

    app.post("/api/auth/login", controller.signin);
    
};