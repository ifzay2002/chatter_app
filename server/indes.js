import { app, server } from "./socket/socket.js";
import express from "express";

import { connectDb } from "./db/connection.db.js";
import cookieParser from "cookie-parser";
import cors from "cors";


connectDb(); // Connect to the database



app.use(cors({
  origin: [process.env.CLIENT_URL],
  credentials: true, // Allow cookies to be sent
}));
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies


const PORT = process.env.PORT || 5000; // Default to 5000 if PORT is not set

// Routes
import userRoute from './routes/user.route.js'
import messageRoute from './routes/message.route.js';

app.use('/api/v1/message', messageRoute);
app.use('/api/v1/user', userRoute);


// Error handling middleware
import { errorMiddleware } from './middlewares/error.middleware.js';
app.use(errorMiddleware);



server.listen(PORT, () => {
  console.log(`Server is running in PORT ${PORT}`)
})



