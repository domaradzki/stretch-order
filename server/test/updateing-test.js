const assert = require("assert");
const Order = require("../models/order");
describe("Updateing records", function() {
  var newOrder;
  this.beforeEach(function(done) {
    newOrder = new Order({
      assortment: "Taśma z nadrukiem"
    });
    newOrder.save().then(function() {
      done();
    });
  });

  it("Update one record in the database", function(done) {
    Order.findOneAndUpdate(
      { assortment: "Taśma z nadrukiem" },
      { assortment: "Taśma pakowa" }
    ).then(function() {
      Order.findOne({ _id: newOrder._id }).then(function(result) {
        assert(result.assortment === "Taśma pakowa");
        done();
      });
    });
  });
});
