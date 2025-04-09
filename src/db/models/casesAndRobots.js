import { model, Schema } from 'mongoose';

const prizeSchema = new Schema({
  id: { type: Number, required: true },
  photo: { type: String, required: true },
  boost: { type: String, default: '' },
  name: { type: String, required: true },
});

const caseSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  desc: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  collectionId: { type: Number, required: true },
  prize: [prizeSchema],
});

const robotsSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  collectionId: { type: Number, required: true },
});

const casesAndRobotsSchema = new Schema({
  cases: [caseSchema],
  robots: [robotsSchema],
});

export const CasesAndRobotsCollection = model('cases', casesAndRobotsSchema);
