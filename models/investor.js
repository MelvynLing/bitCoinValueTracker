var moment = require("moment");
moment().format("YYYY-MM-DD");

module.exports = function(sequelize, DataTypes) {
  var Investor = sequelize.define("Investor", {
    initialAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        min: 0,
        max: 999999999999
      }
    },

    entryDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAfter: "2009-01-09"
      }
    },

    exitDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isBefore: moment,
        isAfter: "2009-01-09"
      }
    },

    bookValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {}
    },

    netAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {}
    },

    gainLoss: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {}
    }
  });
  return Investor;
};
