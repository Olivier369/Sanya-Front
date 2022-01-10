const db = require("../models");
const Utilisateur = db.utilisateurs;
const Role = db.role;
const config = require("../config/auth.config");
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.create = (req, res) => {
    // Validate request
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.sexe || !req.body.password || !req.body.date_naissance) {
      res.status(400).send({
        error: true,
        message: "Une ou plusieurs données obligatoires sont manquantes!"
      });
      return;
    }
    var reg  = false;
    if (reg) {
        res.status(409).send({
            error: true,
            message: "Une ou plusieurs données sont erronées"
        });
        return;
    }

    // var isEmail = false;
    Utilisateur.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
        if (user) {
            res.status(409).send({
                error: true,
                message: "Un compte utilisant cette mail est déjà enregistré"
            });
            return;
        }

        const utilisateur = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          sexe: req.body.sexe,
          password: bcrypt.hashSync(req.body.password, 8),
          date_naissance: req.body.date_naissance
        };
      
        // Save Tutorial in the database
        Utilisateur.create(utilisateur)
          .then(data => {
            if(req.body.roles) {
                Role.findAll({
                  where: {
                    name: {
                      [Op.or]: req.body.roles
                    }
                  }
                }).then(roles => {
                    data.setRoles(roles).then(() => {
                      res.status(201).send({
                          error: false,
                          message: "L\'utilisateur a bien été créé avec succès",
                          user: data,
                          role: roles
                      });
                    });
                });
            } else {
              data.setRoles([1]).then(() => {
                res.status(201).send({
                    error: false,
                    message: "L\'utilisateur a bien été créé avec succès",
                    user: data,
                    roles: "user"
                });
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Autre erreur."
            });
          });
    });
    
  
    // Create a Tutorial
    
};

exports.signin = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(412).send({
      error: true,
      message: "Email/password manquants"
    });
  }

  Utilisateur.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (!user) {
      return res.status(412).send({
        error: true,
        message: "Email/password incorrect"
      });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(412).send({
        error: true,
        message: "Email/password incorrect"
      });
    } 

    var token = jwt.sign({
       id: user.id
    }, config.secret, {
      expiresIn: 86400
    });

    if (token) {
      res.status(200).send({
        error: false,
        message: "L\'utilisateur a été authentifié succès",
        user: user,
        access_token: token,
        refresh_token: token
      });
    }
  });
};

// exports.abonner()

// exports.findAll = (req, res) => {
//     const title = req.query.title;
//     var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
//     Tutorial.findAll({ where: condition })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials."
//         });
//       });
// };

// exports.findOne = (req, res) => {
//     const id = req.params.id;
  
//     Tutorial.findByPk(id)
//       .then(data => {
//         if (data) {
//           res.send(data);
//         } else {
//           res.status(404).send({
//             message: `Cannot find Tutorial with id=${id}.`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error retrieving Tutorial with id=" + id
//         });
//       });
// };

// exports.update = (req, res) => {
//     const id = req.params.id;
  
//     Tutorial.update(req.body, {
//       where: { id: id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "Tutorial was updated successfully."
//           });
//         } else {
//           res.send({
//             message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating Tutorial with id=" + id
//         });
//       });
// };

// exports.delete = (req, res) => {
//     const id = req.params.id;
  
//     Tutorial.destroy({
//       where: { id: id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "Tutorial was deleted successfully!"
//           });
//         } else {
//           res.send({
//             message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Could not delete Tutorial with id=" + id
//         });
//       });
// };

// exports.deleteAll = (req, res) => {
//     Tutorial.destroy({
//       where: {},
//       truncate: false
//     })
//       .then(nums => {
//         res.send({ message: `${nums} Tutorials were deleted successfully!` });
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while removing all tutorials."
//         });
//       });
// };

// exports.findAllPublished = (req, res) => {
//     Tutorial.findAll({ where: { published: true } })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials."
//         });
//       });
// };
