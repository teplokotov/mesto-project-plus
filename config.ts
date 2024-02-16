import 'dotenv/config';

export default {
  PORT: process.env.PORT || 3000,
  DB_CONNECTION: process.env.DB_CONNECTION || 'mongodb://localhost:27017/mestodb',
  JWT_SECRET: process.env.JWT_SECRET || 'fe3bdeb1bbbe59c4b2047bcd8606826ec8d78b6a6ef3a0bcfa7b3f13aab35852',
};
