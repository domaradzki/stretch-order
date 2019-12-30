import * as express from "express";
import * as graphqlHTTP from "express-graphql";
import { graphqlUploadExpress } from "graphql-upload";
import { GraphQLSchema } from "graphql";
import mutation from "./schema/mutations";
import query from "./schema/queries";
import * as cors from "cors";
import { createWriteStream, unlink } from "fs";
import * as mkdirp from "mkdirp";
import { connectDB, connectMongoDB, getDataFromApi } from "./connection";
import File from "./models/file";

const UPLOAD_DIR = "./Projects";
// Ensure upload directory exists.
mkdirp.sync(UPLOAD_DIR);

/**
 * Stores a GraphQL file upload. The file is stored in the filesystem and its
 * metadata is recorded in the DB.
 * @param {GraphQLUpload} upload GraphQL file upload.
 * @returns {object} File metadata.
 */

const storeUpload = async upload => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  // const id = shortid.generate();
  const path = `${UPLOAD_DIR}/${filename}`;
  const file = { filename, mimetype, path };
  // Store the file in the filesystem.
  await new Promise((resolve, reject) => {
    // Create a stream to which the upload will be written.
    const writeStream = createWriteStream(path);
    // When the upload is fully written, resolve the promise.
    writeStream.on("finish", resolve);
    // If there's an error writing the file, remove the partially written file
    // and reject the promise.
    writeStream.on("error", error => {
      unlink(path, () => {
        reject(error);
      });
    });
    stream.on("error", error => writeStream.destroy(error));
    // Pipe the upload into the write stream.
    stream.pipe(writeStream);
  });
  // Record the file metadata in the DB.
  const newFile = new File(file);
  return newFile.save();
};

connectDB();
connectMongoDB();

const app = express();

app.use(cors());

app.get("/api", getDataFromApi);

const schema = new GraphQLSchema({ query, mutation });

app.use(
  "/graphql",
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 3 }),
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("Server started on port 4000");
});

export default app;
