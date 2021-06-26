import mongoose from "mongoose";
import pagination from "mongoose-paginate-v2";

export interface CategoryDocument extends mongoose.Document {
  shop_id: string;
  title: string;
}

export interface ItemDocument extends mongoose.Document {
  shop_id: string;
  category_id?: string;
  title: string;
  description: string;
  price: number;
  offer_price?: number;
  offer_validity?: Date;
  quantity: number;
}

export interface CategoryModel extends mongoose.Model<CategoryDocument> {}
export interface ItemModel extends mongoose.PaginateModel<ItemDocument> {}

const ItemSchema = new mongoose.Schema({
  shop_id: { type: String, required: true, immutable: true },
  category_id: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  offer_price: { type: Number },
  offer_validity: { type: Date },
  quantity: { type: Number, required: true },
});

const CategorySchema = new mongoose.Schema({
  shop_id: { type: String, required: true, immutable: true },
  title: { type: String, required: true },
});

ItemSchema.plugin(pagination);
export { ItemSchema, CategorySchema };
