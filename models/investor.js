module.exports = function(sequelize, DataTypes) {
  var Investor = sequelize.define("Investor", {
    initialAmount: DataTypes.STRING,
    entryDate: DataTypes.STRING,
    exitDate: DataTypes.STRING,
    bookValue: DataTypes.STRING,
    netAmount: DataTypes.STRING,
    gainLoss: DataTypes.STRING
  });
  return Investor;
};
