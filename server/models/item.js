const Sequelize = require("sequelize");
const sequelize = require("../config");
const { Model, STRING, INTEGER, FLOAT } = Sequelize;

const Assortment = require("../models/assortment");
const Order = require("../models/order");

class Item extends Model {}
Item.init(
  {
    id: {
      type: STRING,
      allowNull: false,
      field: "NumerReferencyjny",
      primaryKey: true
    },
    quantity: {
      type: FLOAT,
      allowNull: false,
      field: "Ilosc"
    },
    price: {
      type: FLOAT,
      allowNull: false,
      field: "Cena_NettoPoRabacie"
    },
    netValue: {
      type: FLOAT,
      allowNull: false,
      field: "Wartosc_NettoPoRabacie"
    },
    itemId: {
      type: INTEGER,
      allowNull: false,
      field: "Dokument_Id",
      references: {
        model: Order,
        key: "id"
      }
    },
    assortmentId: {
      type: INTEGER,
      allowNull: false,
      field: "AsortymentAktualnyId",
      references: {
        model: Assortment,
        key: "id"
      }
    }
  },
  {
    sequelize,
    modelName: "item",
    freezeTableName: true,
    timestamps: false,
    schema: "[ModelDanychContainer]",
    tableName: "[PozycjeDokumentu]"
    // options
  }
);

Item.associate = function () {
  Item.belongsTo(Assortment);
};

module.exports = Item;
