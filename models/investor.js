module.exports = function(sequelize, DataTypes) {
  var Investor = sequelize.define("Investor", {
    initialAmount: DataTypes.INTEGER,
    entryDate: DataTypes.STRING,
    exitDate: DataTypes.STRING,
    bookValue: DataTypes.INTEGER,
    netAmount: DataTypes.INTEGER,
    gainLoss: DataTypes.INTEGER
  });
  return Investor;
};
