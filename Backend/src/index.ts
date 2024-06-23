import { MongoClient } from 'mongodb';
import express from 'express';
import body from 'body-parser';
import cors from 'cors';

import customersRouter from './routes/customers';

const start = async () => {
  try {
    const app = express();

    // Enable CORS
    app.use(cors());

    const mongo = await MongoClient.connect('mongodb://localhost:27017/CRM_API');
    app.db = mongo.db();

    // Body parser middleware
    app.use(
      body.json({
        limit: '500kb',
      })
    );

    // Mounting routers
    app.use('/customers', customersRouter);

    // Start server
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

start();
