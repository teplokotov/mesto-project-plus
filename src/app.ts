import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import notFoundRoute from './routes/not-found';
import auth from './middlewares/auth';
import errors from './middlewares/errors';
import { createUser, login } from './controllers/users';
import { errorLogger, requestLogger } from './middlewares/logger';

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(helmet());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(requestLogger);

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', notFoundRoute);

app.use(errorLogger);

app.use(errors);

app.listen(PORT);
