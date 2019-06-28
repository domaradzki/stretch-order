const Sequelize = require('sequelize');
const sequelize = require('../config');
const User = require("../models/user");

const {Model, INTEGER} = Sequelize;

class Trader extends Model {}
Trader.init({
  id: {
      type:INTEGER,
      primaryKey: true,
      allowNull: false,
      field:'PodmiotOpiekunaPodstawowego_Id'
  },
  userId: {
    type: INTEGER,
    allowNull: false,
    field:'UzytkownikId',
    references: {
      model: User,
      key: 'id'}
  }
}, {
  sequelize,
  modelName: 'trader',
  freezeTableName: true,
  timestamps: false,
  schema:'[ModelDanychContainer]',
  tableName: '[OpiekunowiePodmiotu]'
  // options
});
Trader.associate = function () {
  Trader.hasOne(User);
};

module.exports = Trader;