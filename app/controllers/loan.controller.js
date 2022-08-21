const Loan = require("../models/loan.model.js");

const ObjectId = require("mongodb").ObjectID;
// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  console.log(req.body);
  //   if (!req.body.content) {
  //     return res.status(400).send({
  //       message: "loan content can not be empty",
  //     });
  //   }

  // Create a Note
  const loan = new Loan({
    fullName: req.body.fullName,
    nic: req.body.nic,
    email: req.body.email,
    gurantors: req.body.gurantors,
  });

  // Save Note in the database
  loan
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Loan.",
      });
    });
};

exports.findAll = (req, res) => {
  Loan.find()
    .then((loans) => {
      res.send(loans);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving loans.",
      });
    });
};
