const assert = require("assert");
const Order = require("../models/order");
describe("Finding records", function() {
  var newOrder;
  this.beforeEach(function(done) {
    newOrder = new Order({
      assortment: "Taśma z nadrukiem"
    });
    newOrder.save().then(function() {
      done();
    });
  });

  it("Find one record to the database", function(done) {
    Order.findOne({ assortment: "Taśma z nadrukiem" }).then(function(result) {
      assert(result.assortment === "Taśma z nadrukiem");
      done();
    });
  });

  it("Find one by ID record to the database", function(done) {
    Order.findOne({ _id: newOrder._id }).then(function(result) {
      assert(result._id.toString() === newOrder._id.toString());
      done();
    });
  });
});
