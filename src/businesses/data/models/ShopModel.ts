import mongoose from "mongoose";
import pagination from "mongoose-paginate-v2";
import { Address } from "../../domain/Shop";

export interface ShopCategoryDocument extends mongoose.Document {
  title: string;
  display_image: string;
}

export interface ShopDocument extends mongoose.Document {
  name: string;
  place_id: string;
  number: string;
  contact: string;
  ratings: number;
  shop_category_id: string;
  address: Address;
}

export interface ShopCategoryModel
  extends mongoose.PaginateModel<ShopCategoryDocument> {}
export interface ShopModel extends mongoose.PaginateModel<ShopDocument> {}

const ShopCategorySchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  display_image: { type: String },
});

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: "text",
  },
  place_id: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
    max: 10,
    unique: true,
    immutable: true,
  },
  contact: {
    type: String,
    max: 10,
  },
  ratings: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  shop_category_id: {
    type: String,
    required: true,
  },
  address: {
    street: { type: String },
    locality: { type: String },
    city: { type: String },
    pin: { type: Number, max: 6 },
  },
});

ShopSchema.plugin(pagination);
export { ShopSchema, ShopCategorySchema };
