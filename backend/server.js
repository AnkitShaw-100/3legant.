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

// Rest object
const app = express();

// Initialize DB connection once
let dbConnected = false;
const initDB = async () => {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
    } catch (error) {
      console.error('Failed to connect to database:', error);
      throw error;
    }
  }
};

//Middlewares
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'https://try-elegant.vercel.app'
    ];
    
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(morgan('dev'));

// Handle preflight requests
app.options('*', cors());

// Initialize DB before handling requests
app.use(async (req, res, next) => {
  try {
    await initDB();
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ success: false, message: 'Database connection failed' });
  }
});

// Routes 
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/order', orderRoute);

// Rest APIs
app.get("/", (req, res) => {
  res.send({ message: "Welcome to my app" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Export for Vercel serverless environment
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(
      `Server listening in ${process.env.DEV_MODE} mode at port ${PORT}`.bgCyan.white
    );
  });
}
