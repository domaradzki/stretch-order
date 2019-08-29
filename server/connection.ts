import sqlQuery from "./query";
import * as mongoose from "mongoose";
import * as knex from "knex";

const knexConfig = knex({
  client: "mssql",
  connection: {
    user: "sa",
    password: "",
    server: "192.168.0.13",
    database: "Nexo_Goodmarks",
    port: 58857
  }
});
async function connectDB(retries = 5) {
  while (retries) {
    try {
      await knexConfig.raw("select 1+1 as result");
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

function getDataFromApi(req, res) {
  knexConfig
    .raw(sqlQuery)
    .then(function(recordset) {
      res.json(recordset);
    })
    .catch(function(err) {
      res.status(400).send("Error while inserting data");
    });
}

function connectMongoDB() {
  mongoose.connect("mongodb://localhost/goodmark", {
    useNewUrlParser: true,
    useFindAndModify: false
  });

  mongoose.connection
    .once("open", function() {
      console.log("Connection to MongoDB has been made!");
    })
    .on("error", function(error) {
      console.log("Connection error: ", error);
    });
}

export { connectMongoDB, connectDB, getDataFromApi };
