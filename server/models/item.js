const Sequelize = require('sequelize');
const sequelize = require('../config');

const {Model, INTEGER, FLOAT} = Sequelize;

class Item extends Model {}
Item.init({
  id: {
      type:INTEGER,
      primaryKey: true,
      allowNull: false,
      field:'Dokument_Id'
  },
  quantity: {
    type: FLOAT,
    allowNull: false,
    field:'Ilosc'
  },
  price: {
    type: FLOAT,
    allowNull: false,
    field:'Cena_NettoPoRabacie'
  },
  netValue: {
    type: FLOAT,
    allowNull: false,
    field:'Wartosc_NettoPoRabacie'
  },
  itemId: {
    type: INTEGER,
    allowNull: false,
    field:'NumerReferencyjny'
  },
  assortmentId: {
    type: INTEGER,
    allowNull: false,
    field:'AsortymentAktualnyId'
  }
}, {
  sequelize,
  modelName: 'item',
  freezeTableName: true,
  timestamps: false,
  schema:'[ModelDanychContainer]',
  tableName: '[PozycjeDokumentu]'
  // options
});

module.exports = Item;