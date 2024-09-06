import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import dotenv from 'dotenv';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// Load environment variables from .env file
dotenv.config();

// App Configuration
const app = express();
const PORT = 3000

// middleware
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// API End Points
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);


app.get('/', (req, res)=> {
    res.send("API is Working")
})
app.listen(PORT, ()=> {
    console.log(`Server is Running at http://localhost:${PORT}`)
});