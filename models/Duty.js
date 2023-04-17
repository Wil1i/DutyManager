const { DataTypes } = require("sequelize");
const db = require("../configs/db");

const Duty = db.define(
  "duty",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    codePersoneli: {
      type: DataTypes.TEXT,
    },

    startTime: {
      type: DataTypes.TEXT,
    },

    infoID: {
      type: DataTypes.NUMBER,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Duty;
