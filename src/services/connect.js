const sql = require("mssql");

const connect = function() {
  const config = new sql.ConnectionPool({
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