import { model, Schema } from 'mongoose';

const skins = new Schema(
  {
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
      required: true,
    },
    skin_bonus: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const SkinsCollection = model('skins', skins);
