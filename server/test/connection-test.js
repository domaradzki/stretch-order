const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

before(function(done) {
  mongoose.connect("mongodb://localhost/testeroo", {
    useNewUrlParser: true,
    useFindAndModify: false
  });
  mongoose.connection
    .once("open", function() {
      console.log("Connection to MongoDB has been made!");
      done();
    })
    .on("error", function(error) {
      console.log("Connection error: ", error);
    });
});

beforeEach(function(done) {
  mongoose.connection.collections.orders.drop(function() {
    done();
  });
});
