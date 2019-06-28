const Sequelize = require("sequelize");
const sequelize = require("../config");

const { Model, INTEGER, STRING } = Sequelize;

class Kind extends Model {}
Kind.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
      field: "Id"
    },
    name: {
      type: STRING,
      allowNull: false,
      field: "Symbol"
    }
  },
  {
    sequelize,
    modelName: "kind",
    freezeTableName: true,
    timestamps: false,
    schema: "[ModelDanychContainer]",
    tableName: "[RodzajeAsortymentu]"
    // options
  }
);

module.exports = Kind;
