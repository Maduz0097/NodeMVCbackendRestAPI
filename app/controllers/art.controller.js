const Art = require("../models/art.model.js");

// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  // Create a Note
  const art = new Art({
    title: req.body.title || "Untitled Article",
    content: req.body.content,
    contentOne: req.body.contentOne,
    contentTwo: req.body.contentTwo,
    contentThree: req.body.contentThree,
    imgUrl: req.body.imgUrl,
    imgUrlOne: req.body.imgUrlOne,
    imgUrlTwo: req.body.imgUrlTwo,
    imgUrlThree: req.body.imgUrlThree,
    author: req.body.author,
    date: req.body.date,
  });

  // Save Note in the database
  art
    .save()
    .then((data) => {
      res.send(data);
      res.status(210).send({
        message: "Created Art",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Article.",
      });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  Art.find()
    .then((arts) => {
      res.send(arts);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving arts.",
      });
    });
};

// Find a single note with a artId
exports.findOne = (req, res) => {
  Art.findById(req.params.artId)
    .then((art) => {
      if (!art) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.artId,
        });
      }
      res.send(art);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.artId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving note with id " + req.params.artId,
      });
    });
};

// Update a note identified by the artId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Note content can not be empty",
    });
  }

  // Find note and update it with the request body
  Art.findByIdAndUpdate(
    req.params.artId,
    {
      title: req.body.title || "Untitled Article",
      content: req.body.content,
      imgUrl: req.body.imgUrl,
      author: req.body.author,
      date: req.body.date,
    },
    { new: true }
  )
    .then((art) => {
      if (!art) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.artId,
        });
      }
      res.send(art);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.artId,
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.artId,
      });
    });
};

// Delete a note with the specified artId in the request
exports.delete = (req, res) => {
  Art.findByIdAndRemove(req.params.artId)
    .then((art) => {
      if (!art) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.artId,
        });
      }
      res.send({ message: "Note deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.artId,
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.artId,
      });
    });
};
