const assert = require("assert");
const Order = require("../models/order");
describe("Updateing records", function() {
  var newOrder;
  this.beforeEach(function(done) {
    newOrder = new Order({
      assortment: "Taśma z nadrukiem",
      quantity: 144
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

  it("Increment quantity record by 36 in the database", function(done) {
    Order.updateMany({}, { $inc: { quantity: 36 } }).then(function() {
      Order.findOne({ assortment: "Taśma z nadrukiem" }).then(function(record) {
        assert(record.quantity === 180);
        done();
      });
    });
  });
});
