import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import cors from 'cors';

// Configure env
dotenv.config();

// Connect DB 
await connectDB();

// Rest object
const app = express();

//Middlewares
app.use(cors({
  origin: ['http://localhost:3000', 'https://try-elegant.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes 
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/order', orderRoute);

// Rest APIs
app.get("/", (req, res) => {
  res.send({ message: "Welcome to my app" });
});

// Port
const PORT = process.env.PORT || 8080;

// Run Listen
app.listen(PORT, () => {
  console.log(
    `Server listening in ${process.env.DEV_MODE} mode at port ${PORT}`.bgCyan.white
  );
});
