const express = require('express');
const dbConnnection = require('./Connection/db');
const taskRouter = require('./Route/TaskRoute');
const authRouter = require('./Route/authRoute');
const cors = require('cors');
const app = express();
const port = 5000;


app.use(cors()); 
dbConnnection()

app.use(express.json());  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.use('/api/task',taskRouter)
app.use('/api/auth',authRouter)