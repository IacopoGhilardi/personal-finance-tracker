import express, { Express } from 'express';
const app:Express = express();
import usersRouter from './user';
import bankRouter from './banks';
import { authenticateJWT } from '../../../middleware/authMiddleware';

app.use('/users', usersRouter);
app.use('/banks', authenticateJWT, bankRouter);

export default app;