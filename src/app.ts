import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import auth from './middlewares/auth';
import errors from './middlewares/errors';

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(errors);

app.listen(PORT);
