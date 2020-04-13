module.exports = (app) => {
    const politicals = require('../controllers/political.controller.js');

    // Create a new political
    app.post('/politicals', politicals.create);

    // Retrieve all politicals
    app.get('/politicals', politicals.findAll);
 // Create a new political
 
 
 
    // Retrieve a single political with politicalId
    app.get('/politicals/:id', politicals.findOne);

    // Update a political with politicalId
    app.put('/politicals/:id', politicals.update);

    // Delete a political with id
    app.delete('/politicals/:id', politicals.delete);
}