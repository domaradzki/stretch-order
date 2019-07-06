const Sequelize = require("sequelize");
const sequelize = new Sequelize("Nexo_Goodmarks", "sa", "", {
  host: "192.168.0.13",
  port: 58857,
  dialect: "mssql"
});

module.exports = sequelize;
