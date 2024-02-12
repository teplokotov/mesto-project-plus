import { model, Schema } from 'mongoose';
import validator from 'validator';

interface ICard {
  name: String;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const cardSchema = new Schema<ICard>(
  {
    name: {
      type: String,
      minlength: [2, 'минимальная длина поля "name" - 2'],
      maxlength: [30, 'максимальная длина поля "name" - 30'],
      required: [true, 'поле должно быть заполнено'],
    },
    link: {
      type: String,
      validate: {
        validator: (url: string) => validator.isURL(url),
        message: 'Некорректный URL',
      },
      required: [true, 'поле должно быть заполнено'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'поле должно быть заполнено'],
    },
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

export default model<ICard>('card', cardSchema);
