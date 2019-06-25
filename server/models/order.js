const Sequelize = require('sequelize');
const sequelize = require('../config');

const {Model, INTEGER, DATE, STRING, BOOLEAN} = Sequelize;

class Order extends Model {}
Order.init({
  id: {
      type:INTEGER,
      primaryKey: true,
      allowNull: false,
      field:'Id'
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
  },
  traderId: {
    type: INTEGER,
    allowNull: false,
    field:'PodmiotId'
  },
  addressId: {
    type: INTEGER,
    allowNull: true,
    field:'MiejsceDostawyId'
  },
  addressOutId: {
    type: INTEGER,
    allowNull: true,
    field:'MiejsceDostawyZewnetrzneId'
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