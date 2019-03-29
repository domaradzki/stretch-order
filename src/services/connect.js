var sql = require("mssql");

var connect = function() {
  var config = new sql.ConnectionPool({
    user: "sa",
    password: "",
    server: "192.168.0.13",
    database: "Nexo_Goodmarks",
    port: 58857,
    dialect: "mssql",
    dialectOptions: {
      instanceName: "SQLEXPRESS"
    }
  })
  return config;
};

module.exports = connect;