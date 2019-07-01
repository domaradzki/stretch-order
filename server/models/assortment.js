const Sequelize = require("sequelize");
const sequelize = require("../config");
const { Model, INTEGER, STRING } = Sequelize;

const Kind = require("../models/kind");
const Type = require("../models/type");
const Item = require("../models/item");

class Assortment extends Model {}
Assortment.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
      field: "Id"
    },
    code: {
      type: STRING,
      allowNull: false,
      field: "Symbol"
    },
    name: {
      type: STRING,
      allowNull: false,
      field: "Nazwa"
    },
    kindId: {
      type: INTEGER,
      allowNull: false,
      field: "Rodzaj_Id",
      references: {
        model: Kind,
        key: "id"
      }
    },
    typeId: {
      type: INTEGER,
      allowNull: false,
      field: "Grupa_Id",
      references: {
        model: Type,
        key: "id"
      }
    }
  },
  {
    sequelize,
    modelName: "assortment",
    freezeTableName: true,
    timestamps: false,
    schema: "[ModelDanychContainer]",
    tableName: "[Asortymenty]"
    // options
  }
);

Kind.hasOne(Assortment, { foreignKey: "kindId" });
Assortment.belongsTo(Kind, { foreignKey: "kindId" });
Type.hasOne(Assortment, { foreignKey: "typeId" });
Assortment.belongsTo(Type, { foreignKey: "typeId" });

module.exports = Assortment;
