const express = require("express");
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
app.use(cors());
app.use(express.json())

const mongooseConnect =async ()=>{
    await mongoose.connect("mongodb+srv://ishanproj:recum789@cluster0.pqe04.mongodb.net/Recommendo?retryWrites=true&w=majority")
    console.log("MongoDb connected successfully")
}

const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')

app.use('/api/v1/user',userRoutes)
app.use('/routes/admin',adminRoutes)

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})