const express = require('express');
const dbConnnection = require('./Connection/db');
const taskRouter = require('./Route/TaskRoute');
const app = express();
const port = 5000;

dbConnnection()

app.use(express.json());  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.use('/api/task',taskRouter)