const Sequelize = require('sequelize');
const sequelize = require('../config');

const Model = Sequelize.Model;

class Order extends Model {}
Order.init({
  id: {
      type:Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
  },
  dateInsert: {
    type: Sequelize.DATE,
    allowNull: false,
    field:'DataWprowadzenia'
  },
  signature: {
    type: Sequelize.STRING,
    allowNull: false,
    field:'NumerWewnetrzny_PelnaSygnatura'
  },
  symbol: {
    type: Sequelize.STRING,
    allowNull: false,
    field:'Symbol'
  },
  details: {
    type: Sequelize.STRING,
    allowNull: false,
    field:'Uwagi'
  },
  closed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    field:'Zamkniety'
  },
  documentStatus: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field:'StatusDokumentuId'
  },
  clientId: {
    type: Sequelize.INTEGER,
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

  // options
});

module.exports = Order;