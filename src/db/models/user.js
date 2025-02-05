import { model, Schema } from 'mongoose';

const user = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    language_code: {
      type: String,
      required: true,
    },
    photo_url: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    friends: [{ name: String }],
    tokens: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UsersCollection = model('phenerium', user);
