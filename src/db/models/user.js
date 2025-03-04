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
    friends: [{ id: Number, name: String }],
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
    currentBoost: {
      type: Number,
    },
    skins: [
      { id: Number, name: String, skin_photo_url: String, skin_bonus: Number },
    ],
    boosts: [
      {
        idItem: Number,
        name: String,
        boost_photo_url: String,
        boost_bonus: Number,
        collectionId: Number,
        desc: String,
        price: String,
        quantity: Number,
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
    activeBoosts: [
      {
        idItem: Number,
        name: String,
        boost_photo_url: String,
        boost_bonus: Number,
        collectionId: Number,
        desc: String,
        price: String,
        quantity: Number,
      },
    ],
    nextSkinsBonusUpdate: { type: Number },
    usersTasks: {
      gaming: [
        {
          id: Number,
          name: String,
          svg_url: String,
          task_bonus: Number,
          completed: Boolean,
          channelId: String,
        },
      ],
      partners: [
        {
          id: Number,
          name: String,
          svg_url: String,
          task_bonus: Number,
          completed: Boolean,
        },
      ],
      special: [
        {
          id: Number,
          name: String,
          svg_url: String,
          task_bonus: Number,
          completed: Boolean,
        },
      ],
    },
    farmingCycle: {
      type: Number,
    },
    tempTokens: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UsersCollection = model('phenerium', user);
