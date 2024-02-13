import { model, Schema } from 'mongoose';
import validator from 'validator';

interface IUser {
  name?: String;
  about?: String;
  avatar?: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      minlength: [2, 'минимальная длина поля "name" - 2'],
      maxlength: [30, 'максимальная длина поля "name" - 30'],
      required: [true, 'поле должно быть заполнено'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: [2, 'минимальная длина поля "name" - 2'],
      maxlength: [200, 'максимальная длина поля "name" - 200'],
      required: [true, 'поле должно быть заполнено'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      validate: {
        validator: (url: string) => validator.isURL(url),
        message: 'Некорректный URL',
      },
      required: [true, 'поле должно быть заполнено'],
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: (mail: string) => validator.isEmail(mail),
        message: 'Некорректный email',
      },
      required: [true, 'поле должно быть заполнено'],
    },
    password: {
      type: String,
      required: [true, 'поле должно быть заполнено'],
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

export default model<IUser>('user', userSchema);
