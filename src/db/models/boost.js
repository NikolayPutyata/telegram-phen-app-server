import { model, Schema } from 'mongoose';

const boosts = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
    },
    boost_photo_url: {
      type: String,
      required: true,
    },
    boost_bonus: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const BoostsCollection = model('boosts', boosts);
