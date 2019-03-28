const express = require('express');
const app = express();

app.get('/', function (req, res) {
   
    const sql = require("mssql");

    // config for your database
    const config = {
        user: 'sa',
        password: '',
        server: '192.168.0.13', 
        database: 'Nexo_Goodmarks',
        port: '58857',
        dialect: "mssql",
        dialectOptions: {
            instanceName: "SQLEXPRESS" 
        }
        
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        const request = new sql.Request();
           
        // query to the database and get the records
        request.query("SELECT * FROM ModelDanychContainer.Dokumenty WHERE [Symbol] = 'ZK'", function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

const server = app.listen(5000, function () {
    console.log('Server is running..');
});