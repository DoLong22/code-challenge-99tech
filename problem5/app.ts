import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './src/config/db';
import userRouter from './src/services/user';
import { setupSwagger } from './src/docs/swagger';

dotenv.config();

const app = express();
app.use(express.json());

AppDataSource.initialize()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error:', err));

// Routes
app.use('/api/users', userRouter);

// Swagger Docs
setupSwagger(app);

app.get('/', (req, res) => {
    res.send('Welcome to User API');
});

export default app;
