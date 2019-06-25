const Sequelize = require('sequelize');
const sequelize = require('../config');

const {Model, INTEGER, STRING} = Sequelize;

class Client extends Model {}
Client.init({
  id: {
      type:INTEGER,
      primaryKey: true,
      allowNull: false,
      field:'Id'
  },
  name: {
    type: STRING,
    allowNull: false,
    field:'Nazwa'
  }
}, {
  sequelize,
  modelName: 'client',
  freezeTableName: true,
  timestamps: false,
  schema:'[ModelDanychContainer]',
  tableName: '[PodmiotHistorie]'

  // options
});

module.exports = Client;