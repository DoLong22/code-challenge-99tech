import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './src/config/db';
import userRouter from './src/services/user';

dotenv.config();

const app = express();
app.use(express.json());

AppDataSource.initialize()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error:', err));

// Routes
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
    res.send('Welcome to User API');
});

export default app;
