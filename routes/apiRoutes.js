var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/investors", function(req, res) {
    db.Investor.findAll({}).then(function(dbInvestor) {
      res.json(dbInvestor);
    });
  });

  // Create a new example
  app.post("/api/investors", function(req, res) {
    db.Investor.create(req.body).then(function(dbInvestor) {
      res.json(dbInvestor);
    });
  });

  // Delete an example by id
  app.delete("/api/investors/:id", function(req, res) {
    db.Investor.destroy({ where: { id: req.params.id } }).then(function(dbInvestor) {
      res.json(dbInvestor);
    });
  });
};
