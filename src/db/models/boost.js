import { model, Schema } from 'mongoose';

const boostSchema = new Schema({
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
  quantity: {
    type: Number,
  },
});

const categorySchema = new Schema({
  common: {
    type: [boostSchema],
    default: [],
  },
  special: {
    type: [boostSchema],
    default: [],
  },
});

const boostsCollectionSchema = new Schema(
  {
    boosts: {
      type: [categorySchema],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const BoostsCollection = model('boosts', boostsCollectionSchema);
