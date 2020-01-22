import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import { graphqlUploadExpress } from "graphql-upload";
import { GraphQLSchema } from "graphql";
import mutation from "./schema/mutations";
import query from "./schema/queries";
import * as cors from "cors";

import { connectDB, connectMongoDB, getDataFromApi } from "./connection";

// connectDB(); commented as we have temporary json file to for develop
connectMongoDB();

const app = express();

app.use(cors());

app.get("/api", getDataFromApi);

const schema = new GraphQLSchema({ query, mutation });

app.use(
  "/graphql",
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("Server started on port 4000");
});

export default app;
