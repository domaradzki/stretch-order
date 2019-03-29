var express = require('express');
var app = express();
var port = process.env.port || 5000;

var documentsController = require('./src/Controllers/DocumentsController')();

app.use('/api',documentsController);
   
app.get("/product",function(request,response)
{
    response.json({"Message":"Welcome to Node js"});
});

app.listen(port, function () {
    var dateTime = new Date();
    var message = `Server is running on port ${port}. Start at date ${dateTime}`;
    console.log(message);
});