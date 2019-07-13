const assert = require("assert");
const Order = require("../models/order");
describe("Finding records", function() {
  this.beforeEach(function(done) {
    var newOrder = new Order({
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
});
