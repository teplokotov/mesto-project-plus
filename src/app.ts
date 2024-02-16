import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errors as celebrateErrors } from 'celebrate';
import env from '../config';
import { createUserValidator, loginValidator } from './validation/users';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import notFoundRoute from './routes/not-found';
import auth from './middlewares/auth';
import errorsMiddleware from './middlewares/errors';
import { createUser, login } from './controllers/users';
import { errorLogger, requestLogger } from './middlewares/logger';

const app = express();

mongoose.connect(env.DB_CONNECTION);

app.use(helmet());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(requestLogger);

app.post('/signin', loginValidator, login);
app.post('/signup', createUserValidator, createUser);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', notFoundRoute);

app.use(errorLogger);
app.use(celebrateErrors());
app.use(errorsMiddleware);

app.listen(env.PORT);
