import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import connectDB from './config/db.js';
import cors from 'cors';
dotenv.config();
connectDB();
const app=express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000"
}));

app.use(express.urlencoded({ extended: true }));

app.use('/api',routes);
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
