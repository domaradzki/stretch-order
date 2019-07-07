// const sequelize = require("./config");
// const Sequelize = require("sequelize");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const connectDB = require("./connection");
// const sqlQuery = require("./query");

// const documentsController = require("../client/src/Controllers/DocumentsController")();

connectDB();
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch(err => {
//     console.error("Unable to connect to the database:", err);
//   });

const app = express();

app.use(cors());
// app.get("/api", function(req, res) {
//   sequelize
//     .query(sqlQuery, { raw: false, type: Sequelize.QueryTypes.SELECT })
//     .then(orders => orders);
//   return res.orders;
// });
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
