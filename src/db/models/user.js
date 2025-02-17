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
    usersTasks: {
      gaming: [
        {
          id: Number,
          name: String,
          svg_url: String,
          task_bonus: Number,
          completed: Boolean,
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
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UsersCollection = model('phenerium', user);
