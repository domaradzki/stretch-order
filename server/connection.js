const knex = require("knex")({
  client: "mssql",
  connection: {
    user: "sa",
    password: "",
    server: "192.168.0.13",
    database: "Nexo_Goodmarks",
    port: 58857,
    dialect: "mssql",
    dialectOptions: {
      instanceName: "SQLEXPRESS"
    }
  }
});
async function connectDB(retries = 5) {
  while (retries) {
    try {
      await knex.raw("select 1+1 as result");
      console.log(`Connection from KNEX has been established successfully.`);
      break;
    } catch (error) {
      console.error("Couldn't connect to DB: ", error);

      retries -= 1;
      console.log(`retries left: ${retries}`);

      // wait 5 seconds
      await new Promise(res => setTimeout(res, 5000));
    }
  }
}

module.exports = connectDB;
