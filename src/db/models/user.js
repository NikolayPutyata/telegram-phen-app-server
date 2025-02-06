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
    },
    friends: [{ name: String }],
    tokens: {
      type: Number,
    },
    isFarming: {
      type: Boolean,
    },
    farmStart: {
      type: Number,
    },
    farmEnd: {
      type: Number,
    },
    currentPrice: {
      type: Number,
    },
    tempTokens: {
      type: Number,
    },
    lastUpdTime: {
      type: Number,
    },
    skins: [
      { id: Number, name: String, skin_photo_url: String, skin_bonus: Number },
    ],
    boosts: [
      {
        id: Number,
        name: String,
        boost_photo_url: String,
        boost_bonus: Number,
      },
    ],
    activeSkins: [
      {
        id: Number,
        name: String,
        skin_photo_url: String,
        skin_bonus: Number,
      },
    ],
    nextSkinsBonusUpdate: { type: Number },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UsersCollection = model('phenerium', user);
