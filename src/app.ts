import express from 'express';
import mongoose from 'mongoose';
import router from './routes/users';
import auth from './middlewares/auth';

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(auth);

app.post('/users', router);

app.listen(PORT);
