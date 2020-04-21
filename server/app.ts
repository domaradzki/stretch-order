import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import { graphqlUploadExpress } from "graphql-upload";
import { GraphQLSchema } from "graphql";
import * as cors from "cors";

import mutation from "./schema/mutations";
import query from "./schema/queries";

import { connectDB, connectMongoDB, getDataFromApi } from "./connection";

// connectDB(); //commented as we have temporary json file to for develop
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
    graphiql: true,
    customFormatErrorFn(err) {
      if (!err.originalError) {
        return err;
      }
      const data = err.originalError.data;
      const message = err.message || "An error occurred.";
      const code = err.originalError.code || 500;
      return { message: message, status: code, data: data };
    }
  })
);

app.listen(4000, () => {
  console.log("Server started on port 4000");
});

export default app;
