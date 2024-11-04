import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes';

const app: Application = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(routes);

const mongooseConnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://ishanproj:recum789@cluster0.pqe04.mongodb.net/Recommendo?retryWrites=true&w=majority");
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

mongooseConnect();

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
