import express, { Express } from 'express';
const app:Express = express();
import usersRouter from './user';

app.use('/users', usersRouter);

export default app;