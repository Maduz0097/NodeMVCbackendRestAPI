module.exports = (app) => {
    const arts = require('../controllers/art.controller.js');

    // Create a new Note
    app.post('/arts', arts.create);

    // Retrieve all arts
    app.get('/arts', arts.findAll);
 // Create a new Note
 
 // Retrieve all arts

    // Retrieve a single Note with noteId
    app.get('/arts/:artId', arts.findOne);

    // Update a art with artId
    app.put('/arts/:artId', arts.update);

    // Delete a art with artId
    app.delete('/arts/:artId', arts.delete);
}