const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require("mongoose");
const Task = require('./model/taskModel');
const taskRoutes = require('./routes/taskRoutes')
const cors =  require('cors')
app.use(cors())
//Connection to db
const port = process.env.PORT || 5001;
const startServer = async () => {
    try {
        await mongoose.connect(process.env.DB)
        console.log("Coneection to DB");
        app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
    } catch (error) {
        console.log(error);
    }
}
startServer()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(taskRoutes)








