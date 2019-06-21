const sequelize = require('./config');
const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
const app = express();

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
