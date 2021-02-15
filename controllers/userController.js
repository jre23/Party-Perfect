const db = require("../models");

// Defining methods for the UserController
module.exports = {
  findAllUsers: (req, res) => {
    db.User.find(req.query)
      .sort({ date: -1 })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  findUserById: (req, res) => {
    db.User.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  createUser: (req, res) => {
    db.User.create(req.body)
      .then((dbModel) => res.json(dbModel))
      // redirect to /api/users/login route to use firebase authentication?
      .catch((err) => res.status(422).json(err));
  },
  updateUser: (req, res) => {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  removeUser: (req, res) => {
    db.User.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  loginUser: (req, res) => {
    // add firebase authentication stuff here
  },
};