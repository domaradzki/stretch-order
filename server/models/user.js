const Sequelize = require('sequelize');
const sequelize = require('../config');

const {Model, INTEGER, STRING} = Sequelize;

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

module.exports = User;