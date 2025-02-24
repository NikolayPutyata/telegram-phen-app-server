import { model, Schema } from 'mongoose';

const boosts = new Schema(
  {
    idItem: {
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
    collectionId: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
    },
    price: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const BoostsCollection = model('boosts', boosts);
