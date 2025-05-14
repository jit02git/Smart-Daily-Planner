const express = require('express');
const dbConnnection = require('./Connection/db');

const app = express();
const port = 5000;

dbConnnection()

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
