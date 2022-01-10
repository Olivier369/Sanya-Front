const express = require("express");
const bodyParser  = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
db.sequelize.sync({force: true}).then(() => {
    initial();
});
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my first api hook"});
});

// require("./app/routes/tutorial.routes.js")(app);
require("./app/routes/utilisateur.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`);
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });
    Role.create({
        id: 2,
        name: "admin"
    });
    Role.create({
        id: 3,
        name: "moderator"
    });
}