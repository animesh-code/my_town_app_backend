import { PaginateResult, Mongoose } from "mongoose";
import { Category, Item } from "../../domain/Category";
import IShopRepository from "../../domain/IShopRepository";
import Pageable from "../../domain/Pageable";
import { ShopCategory, Address, Shop } from "../../domain/Shop";
import {
  CategoryDocument,
  CategoryModel,
  CategorySchema,
  ItemDocument,
  ItemModel,
  ItemSchema,
} from "../models/CategoryModel";
import {
  ShopCategoryDocument,
  ShopCategoryModel,
  ShopCategorySchema,
  ShopDocument,
  ShopModel,
  ShopSchema,
} from "../models/ShopModel";

export default class ShopRepository implements IShopRepository {
  constructor(private readonly client: Mongoose) {}

  //=================================================================

  public async createShopCategory(
    title: string,
    display_image: string
  ): Promise<string> {
    const model = this.client.model<ShopCategoryDocument>(
      "ShopCategory",
      ShopCategorySchema
    ) as ShopCategoryModel;

    const savedCategory = new model({
      title: title,
    });

    if (display_image) savedCategory.display_image = display_image;

    await savedCategory.save();

    return savedCategory.id;
  }

  public async getShopCategory(id: string): Promise<ShopCategory> {
    const categories = this.client.model<ShopCategoryDocument>(
      "ShopCategory",
      ShopCategorySchema
    ) as ShopCategoryModel;

    const result = await categories.findById(id);

    if (result == null)
      return Promise.reject("Shop category not found with that id");

    return new ShopCategory(result.id, result.title, result.display_image);
  }

  public async getShopCategories(): Promise<ShopCategory[]> {
    const categories = this.client.model<ShopCategoryDocument>(
      "ShopCategory",
      ShopCategorySchema
    ) as ShopCategoryModel;

    const response = await categories.find();

    const result = response.map<ShopCategory>(
      (category) =>
        new ShopCategory(category.id, category.title, category.display_image)
    );

    return result;
  }
  public async updateShopCategory(
    id: string,
    params: ShopCategoryModel
  ): Promise<ShopCategory> {
    const model = this.client.model<ShopCategoryDocument>(
      "ShopCategory",
      ShopCategorySchema
    ) as ShopCategoryModel;
    // console.log(params);
    const result = await model.findByIdAndUpdate(id, params, (err, docs) => {
      if (err) return err;
      return docs;
    });

    if (result == null) return Promise.reject("Something went wrong");

    return new ShopCategory(result.id, result.title, result.display_image);
  }
  public async deleteShopCategory(id: string): Promise<ShopCategory> {
    const model = this.client.model<ShopCategoryDocument>(
      "ShopCategory",
      ShopCategorySchema
    ) as ShopCategoryModel;

    const result = await model.findByIdAndDelete(id);
    // console.log(result);
    if (result == null) return Promise.reject("Check the id");

    return new ShopCategory(result.id, result.title, result.display_image);
  }

  //================================================================================================================================================

  public async create(
    place_id: string,
    shop_category_id: string,
    name: string,
    number: string,
    contact: string,
    ratings: number,
    address?: Address
  ): Promise<string> {
    const model = this.client.model<ShopDocument>(
      "Shop",
      ShopSchema
    ) as ShopModel;

    const savedShop = new model({
      place_id: place_id,
      shop_category_id: shop_category_id,
      name: name,
      number: number,
      ratings: ratings,
    });

    if (contact) savedShop.contact = contact;
    if (address) savedShop.address = address;

    await savedShop.save();

    return savedShop.id;
  }
  public async find(id: string): Promise<Shop> {
    const shops = this.client.model<ShopDocument>(
      "Shop",
      ShopSchema
    ) as ShopModel;

    const result = await shops.findById(id);

    if (result == null) return Promise.reject("Shop not found");

    return new Shop(
      result.id,
      result.place_id,
      result.shop_category_id,
      result.name,
      result.number,
      result.contact,
      result.ratings,
      result.address
    );
  }
  public async update(id: string, data: ShopModel): Promise<Shop> {
    const model = this.client.model<ShopDocument>(
      "Shop",
      ShopSchema
    ) as ShopModel;

    const result = await model.findByIdAndUpdate(id, data, (err, docs) => {
      if (err) return err;
      return docs;
    });

    if (result == null) return Promise.reject("Something went wrong");

    return new Shop(
      result.id,
      result.place_id,
      result.shop_category_id,
      result.name,
      result.number,
      result.contact,
      result.ratings,
      result.address
    );
  }
  public async delete(id: string): Promise<Shop> {
    const shops = this.client.model<ShopDocument>(
      "Shop",
      ShopSchema
    ) as ShopModel;

    const result = await shops.findByIdAndDelete(id);

    if (result == null) return Promise.reject("Check the id");

    return new Shop(
      result.id,
      result.place_id,
      result.shop_category_id,
      result.name,
      result.number,
      result.contact,
      result.ratings,
      result.address
    );
  }
  public async findByPlace(
    place_id: string,
    page: number,
    page_size: number
  ): Promise<Pageable<Shop>> {
    const shops = this.client.model<ShopDocument>(
      "Shop",
      ShopSchema
    ) as ShopModel;

    const pageOptions = { page: page, limit: page_size, forceCountFn: true };
    const query = { place_id: place_id };

    const pageResults = await shops
      .paginate(query, pageOptions)
      .catch((_) => null);

    return this.shopsFromPageResult(pageResults);
  }
  public async findByCategory(
    shop_category_id: string,
    place_id: string,
    page: number,
    page_size: number
  ): Promise<Pageable<Shop>> {
    const shops = this.client.model<ShopDocument>(
      "Shop",
      ShopSchema
    ) as ShopModel;

    const pageOptions = { page: page, limit: page_size, forceCountFn: true };
    const query = { shop_category_id: shop_category_id, place_id: place_id };

    const pageResults = await shops
      .paginate(query, pageOptions)
      .catch((_) => null);

    return this.shopsFromPageResult(pageResults);
  }

  //================================================================================================================================================

  public async createCategory(shop_id: string, title: string): Promise<string> {
    const model = this.client.model<CategoryDocument>(
      "Category",
      CategorySchema
    ) as CategoryModel;

    const savedCategory = new model({
      shop_id: shop_id,
      title: title,
    });

    await savedCategory.save();

    return savedCategory.id;
  }
  public async getCategories(shop_id: string): Promise<Category[]> {
    const categoryModel = this.client.model<CategoryDocument>(
      "Category",
      CategorySchema
    ) as CategoryModel;

    const itemModel = this.client.model<ItemDocument>(
      "Item",
      ItemSchema
    ) as ItemModel;

    const categories = await categoryModel.find({ shop_id: shop_id });

    if (categories === null) return Promise.reject("Categories not found");
    const category_ids = categories.map((c) => c.id);

    const items = await itemModel.find({ category_id: { $in: category_ids } });

    return this.categoryWithItems(categories, items);
  }
  public async updateCategory(
    id: string,
    data: CategoryModel
  ): Promise<Category> {
    const model = this.client.model<CategoryDocument>(
      "Category",
      CategorySchema
    ) as CategoryModel;

    const result = await model.findByIdAndUpdate(id, data, (err, docs) => {
      if (err) return err;
      return docs;
    });

    if (result === null) return Promise.reject("Check the id");

    return new Category(result.id, result.shop_id, result.title);
  }
  public async deleteCategory(id: string): Promise<Category> {
    const model = this.client.model<CategoryDocument>(
      "Category",
      CategorySchema
    ) as CategoryModel;

    const result = await model.findByIdAndDelete(id);

    if (result === null) return Promise.reject("Check the id");

    return new Category(result.id, result.shop_id, result.title);
  }

  //==================================================================================================================================================

  public async createItem(
    shop_id: string,
    title: string,
    description: string,
    price: string,
    quantity: number,
    category_id?: string,
    offer_price?: number,
    offer_validity?: Date
  ): Promise<string> {
    const model = this.client.model<ItemDocument>(
      "Item",
      ItemSchema
    ) as ItemModel;

    const savedItem = new model({
      shop_id: shop_id,
      title: title,
      description: description,
      price: price,
      quantity: quantity,
      category_id: category_id,
      offer_price: offer_price,
      offer_validity: offer_validity,
    });

    await savedItem.save();

    return savedItem.id;
  }
  public async getItem(id: string): Promise<Item> {
    const items = this.client.model<ItemDocument>(
      "Item",
      ItemSchema
    ) as ItemModel;

    const result = await items.findById(id);

    if (result === null) return Promise.reject("Check the id, item not found");

    return new Item(
      result.id,
      result.shop_id,
      result.title,
      result.description,
      result.price,
      result.quantity,
      result.category_id,
      result.offer_price,
      result.offer_validity
    );
  }
  public async updateItem(id: string, data: ItemModel): Promise<Item> {
    const items = this.client.model<ItemDocument>(
      "Item",
      ItemSchema
    ) as ItemModel;

    const result = await items.findByIdAndUpdate(id, data, (err, docs) => {
      if (err) return err;
      return docs;
    });

    if (result === null) return Promise.reject("Check the id or provided data");

    return new Item(
      result.id,
      result.shop_id,
      result.title,
      result.description,
      result.price,
      result.quantity,
      result.category_id,
      result.offer_price,
      result.offer_validity
    );
  }
  public async deleteItem(id: string): Promise<Item> {
    const items = this.client.model<ItemDocument>(
      "Item",
      ItemSchema
    ) as ItemModel;

    const result = await items.findByIdAndDelete(id);

    if (result === null) return Promise.reject("Check the id or provided data");

    return new Item(
      result.id,
      result.shop_id,
      result.title,
      result.description,
      result.price,
      result.quantity,
      result.category_id,
      result.offer_price,
      result.offer_validity
    );
  }
  public async getAllItem(
    shop_id: string,
    page: number,
    page_size: number
  ): Promise<Pageable<Item>> {
    const items = this.client.model<ItemDocument>(
      "Item",
      ItemSchema
    ) as ItemModel;

    const pageOptions = { page: page, limit: page_size, forceCountFn: true };
    const query = { shop_id: shop_id };

    const pageResults = await items
      .paginate(query, pageOptions)
      .catch((_) => null);

    return this.itemsFromPageResult(pageResults);
  }
  public async getItemsByCategory(
    category_id: string,
    shop_id: string,
    page: number,
    page_size: number
  ): Promise<Pageable<Item>> {
    const items = this.client.model<ItemDocument>(
      "Item",
      ItemSchema
    ) as ItemModel;

    const pageOptions = { page: page, limit: page_size, forceCountFn: true };
    const query = { category_id: category_id };

    const pageResults = await items
      .paginate(query, pageOptions)
      .catch((_) => null);

    return this.itemsFromPageResult(pageResults);
  }

  //======================================================================================
  private itemsFromPageResult(
    pageResults: PaginateResult<ItemDocument> | null
  ) {
    if (pageResults === null || pageResults.docs.length === 0)
      return Promise.reject("Items not found");

    const results = pageResults.docs.map<Item>(
      (model) =>
        new Item(
          model.id,
          model.shop_id,
          model.title,
          model.description,
          model.price,
          model.quantity,
          model.category_id,
          model.offer_price,
          model.offer_validity
        )
    );

    return new Pageable<Item>(
      pageResults.page ?? 0,
      pageResults.limit,
      pageResults.totalPages,
      results
    );
  }

  private shopsFromPageResult(
    pageResults: PaginateResult<ShopDocument> | null
  ) {
    if (pageResults === null || pageResults.docs.length === 0)
      return Promise.reject("Shops not found");

    const results = pageResults.docs.map<Shop>(
      (model) =>
        new Shop(
          model.id,
          model.place_id,
          model.shop_category_id,
          model.name,
          model.number,
          model.contact,
          model.ratings,
          model.address
        )
    );

    return new Pageable<Shop>(
      pageResults.page ?? 0,
      pageResults.limit,
      pageResults.totalPages,
      results
    );
  }

  private categoryWithItems(
    categories: CategoryDocument[],
    items: ItemDocument[]
  ): Category[] {
    return categories.map(
      (cat) =>
        new Category(
          cat.id,
          cat.shop_id,
          cat.title,
          items
            .filter((item) => item.category_id === cat.id)
            .map(
              (item) =>
                new Item(
                  item.id,
                  item.shop_id,
                  item.title,
                  item.description,
                  item.price,
                  item.quantity,
                  item.category_id,
                  item.offer_price,
                  item.offer_validity
                )
            )
        )
    );
  }
}
