const Sequelize = require("sequelize");
const sequelize = require("../config");
const Client = require("../models/client");
const Trader = require("../models/trader");
const Address = require("../models/address");

const { Model, INTEGER, DATE, STRING, BOOLEAN } = Sequelize;

class Order extends Model {}
Order.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
      field: "Id"
    },
    dateInsert: {
      type: DATE,
      allowNull: false,
      field: "DataWprowadzenia"
    },
    signature: {
      type: STRING,
      allowNull: false,
      field: "NumerWewnetrzny_PelnaSygnatura"
    },
    symbol: {
      type: STRING,
      allowNull: false,
      field: "Symbol"
    },
    details: {
      type: STRING,
      allowNull: false,
      field: "Uwagi"
    },
    closed: {
      type: BOOLEAN,
      allowNull: false,
      field: "Zamkniety"
    },
    documentStatus: {
      type: INTEGER,
      allowNull: false,
      field: "StatusDokumentuId"
    },
    clientId: {
      type: INTEGER,
      allowNull: false,
      field: "PodmiotWybranyId",
      references: {
        model: Client,
        key: "id"
      }
    },
    traderId: {
      type: INTEGER,
      allowNull: false,
      field: "PodmiotId",
      references: {
        model: Trader,
        key: "id"
      }
    },
    addressId: {
      type: INTEGER,
      allowNull: true,
      field: "MiejsceDostawyId",
      references: {
        model: Address,
        key: "id"
      }
    },
    addressOutId: {
      type: INTEGER,
      allowNull: true,
      field: "MiejsceDostawyZewnetrzneId",
      references: {
        model: Address,
        key: "id"
      }
    }
  },
  {
    sequelize,
    modelName: "order",
    freezeTableName: true,
    timestamps: false,
    schema: "[ModelDanychContainer]",
    tableName: "[Dokumenty]"
  }
);

module.exports = Order;
