const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const connection = require("./connection");

connection.connectDB();

const app = express();

app.use(cors());

app.get("/api", connection.getDataFromApi);

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
