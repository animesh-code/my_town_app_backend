import mongoose from "mongoose";

export interface PlaceDocument extends mongoose.Document {
  city: string;
  district: string;
  state: string;
  country: string;
}

export interface PlaceModel extends mongoose.Model<PlaceDocument> {}

const PlaceSchema = new mongoose.Schema({
  city: { type: String, required: true, unique: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, default: "India" },
});

export { PlaceSchema };
