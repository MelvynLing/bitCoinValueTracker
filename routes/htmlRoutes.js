var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Investor.findAll({}).then(function(dbInvestor) {
      res.render("index", {
        msg: "Welcome!",
        investors: dbInvestor
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/investor/:id", function(req, res) {
    db.Investor.findOne({ where: { id: req.params.id } }).then(function(dbInvestor) {
      res.render("investor", {
        investor: dbInvestor
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
