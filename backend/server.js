import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { userRouter } from './routes/index.js';

import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

// To parse body of the request
app.use(express.json());
// To deal with forms
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Server running!');
});

app.use('/api/users', userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
