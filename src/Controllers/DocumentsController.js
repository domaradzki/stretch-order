var express = require("express");
var router = express.Router();
var sql = require("mssql");
var config = require("../services/connect")();

var routes = function(){
  router.route("/").get(function(req, res) {
    debugger;
    config
      .connect()
      .then(function() {
        var sqlQuery = "SELECT * FROM ModelDanychContainer.Dokumenty WHERE [Symbol] = 'ZK'";
        var req = new sql.Request(config);
        req
          .query(sqlQuery)
          .then(function(recordset) {
            res.json(recordset.recordset);
            config.close();
          })
          .catch(function(err) {
            config.close();
            res.status(400).send("Error while inserting data -first");
          });
      })
      .catch(function(err) {
        config.close();
        console.log(err);
        console.log(req);
        res.status(400).send("Error while inserting data - second");
      });
  });
  return router;
};

module.exports = routes;
