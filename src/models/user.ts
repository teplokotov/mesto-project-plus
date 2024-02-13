import {
  Model, Document, model, Schema,
} from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

interface IUser {
  name?: String;
  about?: String;
  avatar?: string;
  email: string;
  password: string;
}

interface UserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  findUserByCredentials: (email: string, password: string) => Promise<Document<unknown, any, IUser>>
}

const userSchema = new Schema<IUser, UserModel>(
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

userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) return Promise.reject(new Error('Неправильные почта или пароль'));

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) return Promise.reject(new Error('Неправильные почта или пароль'));

          return user;
        });
    });
});

export default model<IUser, UserModel>('user', userSchema);
