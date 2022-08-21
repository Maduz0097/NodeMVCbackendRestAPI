module.exports = (app) => {
  const loans = require("../controllers/loan.controller.js");

  // Create a new political
  app.post("/loans", loans.create);
  app.get("/loans", loans.findAll);
};
