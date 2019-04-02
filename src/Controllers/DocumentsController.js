const express = require("express");
const router = express.Router();
const sql = require("mssql");
const config = require("../services/connect")();

const routes = function() {
  router.route("/").get(function(req, res) {
    debugger;
    config
      .connect()
      .then(function() {
        const sqlQuery = `SELECT d.Id 
        ,d.DataWprowadzenia 
        ,podmiot.Nazwa AS Klient
        ,d.NumerWewnetrzny_PelnaSygnatura AS Sygnatura 
        ,d.Symbol 
        ,asortyment.Symbol AS Kod 
        ,asortyment.Nazwa AS Towar
        ,pozycje.Ilosc 
        ,pozycje.Cena_NettoPoRabacie AS Cena 
        ,pozycje.Wartosc_NettoPoRabacie AS Wartosc 
        ,d.Uwagi 
        ,d.Zamkniety 
        ,d.StatusDokumentuId 
        ,adres.LiniaCalosc AS AdresDostawy 
        ,uzytkownicy.Login AS Opiekun 
          FROM [Nexo_Goodmarks].[ModelDanychContainer].[Dokumenty] d 
          INNER JOIN [Nexo_Goodmarks].[ModelDanychContainer].[AdresHistorie] adres 
          ON d.MiejsceDostawyId = adres.Id 
          INNER JOIN [Nexo_Goodmarks].[ModelDanychContainer].[PodmiotHistorie] podmiot 
          ON d.PodmiotWybranyId = podmiot.Id 
          INNER JOIN [Nexo_Goodmarks].[ModelDanychContainer].[PozycjeDokumentu] pozycje 
          ON d.Id = pozycje.Dokument_Id 
          INNER JOIN (Select * FROM [Nexo_Goodmarks].[ModelDanychContainer].[Asortymenty] WHERE Symbol <> 'TRANSPORT IN POST' and Symbol <> 'TRANSPORT') asortyment
          ON pozycje.AsortymentAktualnyId = asortyment.Id
          INNER JOIN [Nexo_Goodmarks].[ModelDanychContainer].[OpiekunowiePodmiotu] opiekunowie
          ON d.PodmiotId = opiekunowie.Podmiot_Id
          INNER JOIN [Nexo_Goodmarks].[ModelDanychContainer].[Uzytkownicy] uzytkownicy
          ON uzytkownicy.Id = opiekunowie.UzytkownikId
          WHERE d.Symbol = 'ZK' or d.Symbol = 'FP'
          ORDER BY d.Id`;
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
