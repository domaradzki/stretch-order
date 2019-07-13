const assert = require("assert");
const Order = require("../models/order");
describe("Saving records", function() {
  it("Save record to the database", function(done) {
    var newOrder = new Order({
      assortment: "Taśma z nadrukiem"
    });
    newOrder.save().then(function() {
      assert(newOrder.isNew === false);
      done();
    });
  });
});
