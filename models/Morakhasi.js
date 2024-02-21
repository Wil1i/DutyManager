const { DataTypes } = require("sequelize");
const db = require("../configs/db");

const Morakhasi = db.define(
  "morakhasis",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    codePersoneli: {
      type: DataTypes.STRING,
    },

    startTime: {
      type: DataTypes.STRING,
    },

    endTime: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

Morakhasi.sync()

module.exports = Morakhasi;
