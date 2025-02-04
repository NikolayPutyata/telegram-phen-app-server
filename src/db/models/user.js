import { model, Schema } from 'mongoose';

const user = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UsersCollection = model('initUser', user);
