import * as mongoose from "mongoose";

export interface UserModel extends mongoose.Document {
  place_id: string;
  number: string;
  name: string;
  gender: string;
  age: Date;
  donor: boolean;
  bloodGroup?: string;
}

export const UserSchema = new mongoose.Schema({
  place_id: { type: String, required: true },
  number: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  gender: String,
  age: Date,
  donor: { type: Boolean },
  bloodGroup: String,
});
