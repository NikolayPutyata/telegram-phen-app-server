import { model, Schema } from 'mongoose';

const skinSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  skin_photo_url: {
    type: String,
    required: false,
    default: '',
  },
  skin_bonus: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const skinsCollectionSchema = new Schema(
  {
    commonCollection: {
      type: [skinSchema],
      required: true,
      default: [],
    },
    bronzeCollection: {
      type: [skinSchema],
      required: true,
      default: [],
    },
    silverCollection: {
      type: [skinSchema],
      required: true,
      default: [],
    },
    goldCollection: {
      type: [skinSchema],
      required: true,
      default: [],
    },
    platinumCollection: {
      type: [skinSchema],
      required: true,
      default: [],
    },
    diamondCollection: {
      type: [skinSchema],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const SkinsCollection = model('skins', skinsCollectionSchema);
