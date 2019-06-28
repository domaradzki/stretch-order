const Sequelize = require("sequelize");
const sequelize = require("../config");

const { Model, INTEGER, STRING } = Sequelize;

class Type extends Model {}
Type.init(
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
      field: "Nazwa"
    }
  },
  {
    sequelize,
    modelName: "type",
    freezeTableName: true,
    timestamps: false,
    schema: "[ModelDanychContainer]",
    tableName: "[GrupyAsortymentu]"
    // options
  }
);

module.exports = Type;
