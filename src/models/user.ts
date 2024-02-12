import { model, Schema } from 'mongoose';
import validator from 'validator';

interface IUser {
  name: String;
  about: String;
  avatar: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: [2, 'минимальная длина поля "name" - 2'],
    maxlength: [30, 'максимальная длина поля "name" - 30'],
    required: [true, 'поле должно быть заполнено'],
  },
  about: {
    type: String,
    minlength: [2, 'минимальная длина поля "name" - 2'],
    maxlength: [200, 'максимальная длина поля "name" - 200'],
    required: [true, 'поле должно быть заполнено'],
  },
  avatar: {
    type: String,
    validate: {
      validator: (url: string) => validator.isURL(url),
      message: 'Некорректный URL',
    },
    required: [true, 'поле должно быть заполнено'],
  },
});

export default model<IUser>('user', userSchema);
