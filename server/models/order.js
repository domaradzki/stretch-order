const Sequelize = require('sequelize');
const sequelize = require('../config');

const {Model, INTEGER, DATE, STRING, BOOLEAN} = Sequelize;

class Order extends Model {}
Order.init({
  id: {
      type:INTEGER,
      primaryKey: true,
      allowNull: false
  },
  dateInsert: {
    type: DATE,
    allowNull: false,
    field:'DataWprowadzenia'
  },
  signature: {
    type: STRING,
    allowNull: false,
    field:'NumerWewnetrzny_PelnaSygnatura'
  },
  symbol: {
    type: STRING,
    allowNull: false,
    field:'Symbol'
  },
  details: {
    type: STRING,
    allowNull: false,
    field:'Uwagi'
  },
  closed: {
    type: BOOLEAN,
    allowNull: false,
    field:'Zamkniety'
  },
  documentStatus: {
    type: INTEGER,
    allowNull: false,
    field:'StatusDokumentuId'
  },
  clientId: {
    type: INTEGER,
    allowNull: false,
    field:'PodmiotWybranyId'
  }
}, {
  sequelize,
  modelName: 'order',
  freezeTableName: true,
  timestamps: false,
  schema:'[ModelDanychContainer]',
  tableName: '[Dokumenty]'

});

module.exports = Order;