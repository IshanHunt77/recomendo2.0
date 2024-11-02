// import { userRoutes } from "./routes/user";
import express, { Application } from 'express'
const app:Application = express();
import mongoose from 'mongoose';
import cors from 'cors'
app.use(cors());
app.use(express.json())

const mongooseConnect =async ()=>{
    await mongoose.connect("mongodb+srv://ishanproj:recum789@cluster0.pqe04.mongodb.net/Recommendo?retryWrites=true&w=majority")
    console.log("MongoDb connected successfully")
}

import routes from './routes';
app.use('/',routes)


mongooseConnect()
const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`)
})