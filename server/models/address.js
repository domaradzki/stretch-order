const Sequelize = require('sequelize');
const sequelize = require('../config');

const {Model, INTEGER, STRING} = Sequelize;

class Address extends Model {}
Address.init({
  id: {
      type:INTEGER,
      primaryKey: true,
      allowNull: false,
      field:'Id'
  },
  deliveryAddress: {
    type: STRING,
    allowNull: false,
    field:'LiniaCalosc'
  }
}, {
  sequelize,
  modelName: 'address',
  freezeTableName: true,
  timestamps: false,
  schema:'[ModelDanychContainer]',
  tableName: '[AdresHistorie]'
  // options
});

module.exports = Address;