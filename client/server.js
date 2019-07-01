const express = require('express');
const app = express();
const port = process.env.port || 5000;

const documentsController = require('./src/Controllers/DocumentsController')();

app.use('/api',documentsController);
   

app.listen(port, function () {
    const dateTime = new Date();
    const message = `Server is running on port ${port}. Start at date ${dateTime}`;
    console.log(message);
});