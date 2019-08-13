import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import { GraphQLSchema } from "graphql";
import mutation from "./schema/mutations";
import query from "./schema/queries";
import * as cors from "cors";
import { connectDB, connectMongoDB, getDataFromApi } from "./connection";

connectDB();
connectMongoDB();

const app = express();

app.use(cors());

app.get("/api", getDataFromApi);

const schema = new GraphQLSchema({ query, mutation });

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

export default app;
