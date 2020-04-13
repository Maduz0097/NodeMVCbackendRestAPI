const Political = require('../models/political.model.js');

const ObjectId  = require('mongodb').ObjectID;
// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a Note
    const political = new Political({
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
        date: req.body.date
    });

    // Save Note in the database
    political.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Article."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Political.find()
    .then(politicals => {
        res.send(politicals);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving politicals."
        });
    });
};


// Find a single note with a id
exports.findOne = (req, res) => {
    Political.findById(req.params.id)
    .then(political => {
        if(!political) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });            
        }
        res.send(political);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.id
        });
    });
};

// Update a note identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Political.findByIdAndUpdate(req.params.id, {
        title: req.body.title || "Untitled Article", 
        content: req.body.content,
        imgUrl: req.body.imgUrl, 
        author: req.body.author,
        date: req.body.date
    }, {new: true})
    .then(political => {
        if(!political) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        res.send(political);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.id
        });
    });
};

// Delete a note with the specified id in the request
exports.delete = (req, res) => {
    Political.findByIdAndRemove(req.params.id)
    .then(political => {
        if(!political) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.id
        });
    });
};
