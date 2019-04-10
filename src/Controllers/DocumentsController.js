const express = require("express");
const router = express.Router();
const sql = require("mssql");
const config = require("../services/connect")();

const routes = function() {
  router.route("/").get(function(req, res) {
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    config
      .connect()
      .then(function() {
        const sqlQuery = `SELECT d.id 
        ,d.DataWprowadzenia AS dateInsert
        ,podmiot.Nazwa AS client
        ,d.NumerWewnetrzny_PelnaSygnatura AS signature
        ,d.Symbol AS symbol
        ,asortyment.Symbol AS code
        ,asortyment.Nazwa AS assortment
        ,pozycje.Ilosc AS quantity
        ,pozycje.Cena_NettoPoRabacie AS price
        ,pozycje.Wartosc_NettoPoRabacie AS netValue
        ,d.Uwagi AS details
        ,d.Zamkniety AS closed
        ,d.StatusDokumentuId AS documentStatus
        ,adres.LiniaCalosc AS deliveryAddress
        ,uzytkownicy.Login AS trader
        ,pozycje.NumerReferencyjny AS itemId
          FROM [Nexo_Goodmarks].[ModelDanychContainer].[Dokumenty] d 
          INNER JOIN [Nexo_Goodmarks].[ModelDanychContainer].[AdresHistorie] adres 
          ON d.MiejsceDostawyId = adres.Id or d.MiejsceDostawyZewnetrzneId = adres.Id
          INNER JOIN [Nexo_Goodmarks].[ModelDanychContainer].[PodmiotHistorie] podmiot 
          ON d.PodmiotWybranyId = podmiot.Id 
          INNER JOIN [Nexo_Goodmarks].[ModelDanychContainer].[PozycjeDokumentu] pozycje 
          ON d.Id = pozycje.Dokument_Id 
          INNER JOIN (Select * FROM [Nexo_Goodmarks].[ModelDanychContainer].[Asortymenty] WHERE Symbol <> 'TRANSPORT IN POST' and Symbol <> 'TRANSPORT') asortyment
          ON pozycje.AsortymentAktualnyId = asortyment.Id
          INNER JOIN [Nexo_Goodmarks].[ModelDanychContainer].[OpiekunowiePodmiotu] opiekunowie
          ON d.PodmiotId = opiekunowie.PodmiotOpiekunaPodstawowego_Id
          INNER JOIN [Nexo_Goodmarks].[ModelDanychContainer].[Uzytkownicy] uzytkownicy
          ON uzytkownicy.Id = opiekunowie.UzytkownikId
          WHERE d.Symbol = 'ZK' or d.Symbol = 'FP'
          ORDER BY d.Id DESC`;
        const req = new sql.Request(config);
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
        res.status(400).send("Error while inserting data - second");
      });
  });
  return router;
};

module.exports = routes;
