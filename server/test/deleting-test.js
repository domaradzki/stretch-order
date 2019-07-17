const assert = require("assert");
const Order = require("../models/order");
describe("Deleting records", function() {
  var newOrder;
  this.beforeEach(function(done) {
    newOrder = new Order({
      assortment: "Taśma z nadrukiem"
    });
    newOrder.save().then(function() {
      done();
    });
  });

  it("Delete one record to the database", function(done) {
    Order.findOneAndRemove({ assortment: "Taśma z nadrukiem" }).then(
      function() {
        Order.findOne({ assortment: "Taśma z nadrukiem" }).then(function(
          result
        ) {
          assert(result === null);
          done();
        });
      }
    );
  });
});
