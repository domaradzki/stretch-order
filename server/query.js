const sqlQuery = `SELECT d.id 
        ,d.DataWprowadzenia AS dateInsert
        ,d.NumerWewnetrzny_PelnaSygnatura AS signature
        ,d.Symbol AS symbol
        ,d.Uwagi AS details
        ,d.Zamkniety AS closed
        ,d.StatusDokumentuId AS documentStatus
        ,podmiot.Nazwa AS client
        ,uzytkownicy.Login AS trader
        ,adres.LiniaCalosc AS deliveryAddress
        ,pozycje.Ilosc AS quantity
        ,pozycje.Cena_NettoPoRabacie AS price
        ,pozycje.Wartosc_NettoPoRabacie AS netValue
        ,pozycje.NumerReferencyjny AS itemId

        ,asortyment.Symbol AS code
        ,asortyment.Nazwa AS assortment
        ,grupa.Nazwa AS type
        ,rodzaj.Symbol AS kind
	,dokument_realizujacy.DokumentyRealizujace_Id AS numberOfDocumentInvoice
          FROM [Nexo_Goodmarks].[ModelDanychContainer].[Dokumenty] d 
          INNER JOIN [Nexo_Goodmarks].[ModelDanychContainer].[PodmiotHistorie] podmiot 
          ON d.PodmiotWybranyId = podmiot.Id 
          INNER JOIN [Nexo_Goodmarks].[ModelDanychContainer].[AdresHistorie] adres 
          ON d.MiejsceDostawyId = adres.Id or d.MiejsceDostawyZewnetrzneId = adres.Id
          INNER JOIN [Nexo_Goodmarks].[ModelDanychContainer].[OpiekunowiePodmiotu] opiekunowie
          ON d.PodmiotId = opiekunowie.PodmiotOpiekunaPodstawowego_Id
          INNER JOIN [Nexo_Goodmarks].[ModelDanychContainer].[Uzytkownicy] uzytkownicy
          ON uzytkownicy.Id = opiekunowie.UzytkownikId
          INNER JOIN [Nexo_Goodmarks].[ModelDanychContainer].[PozycjeDokumentu] pozycje 
          ON d.Id = pozycje.Dokument_Id 

          INNER JOIN (Select * FROM [Nexo_Goodmarks].[ModelDanychContainer].[Asortymenty] WHERE Symbol <> 'TRANSPORT IN POST' and Symbol <> 'TRANSPORT') asortyment
          ON pozycje.AsortymentAktualnyId = asortyment.Id
          INNER JOIN [Nexo_Goodmarks].[ModelDanychContainer].[RodzajeAsortymentu] rodzaj
          ON asortyment.Rodzaj_Id = rodzaj.Id
          INNER JOIN [Nexo_Goodmarks].[ModelDanychContainer].[GrupyAsortymentu] grupa
          ON asortyment.Grupa_Id = grupa.Id

	  LEFT OUTER JOIN [Nexo_Goodmarks].[ModelDanychContainer].[DokumentDokument] dokument_realizujacy
          ON dokument_realizujacy.[DokumentyRealizujace_Id] = d.Id
          WHERE (d.Symbol = 'ZK' or d.Symbol = 'FP') and (d.DataWprowadzenia >= '2019-06-01')
          ORDER BY d.Id DESC`;
          
module.exports = sqlQuery;
