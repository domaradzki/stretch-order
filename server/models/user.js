const Sequelize = require('sequelize');
const sequelize = require('../config');

const {Model, INTEGER, STRING} = Sequelize;

const Trader = require("../models/trader");

class User extends Model {}
User.init({
  id: {
      type:INTEGER,
      primaryKey: true,
      allowNull: false,
      field:'Id'
  },
  name: {
    type: STRING,
    allowNull: false,
    field:'Login'
  }
}, {
  sequelize,
  modelName: 'user',
  freezeTableName: true,
  timestamps: false,
  schema:'[ModelDanychContainer]',
  tableName: '[Uzytkownicy]'
  // options
});

//Trader.hasOne(User);
User.associate = function () {
  User.belongsTo(Trader);
};

module.exports = User;