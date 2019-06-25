const Sequelize = require('sequelize');
const sequelize = require('../config');

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
    field:'UzytkownikId'
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

module.exports = Trader;