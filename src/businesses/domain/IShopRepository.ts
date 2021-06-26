import { CategoryModel, ItemModel } from "../data/models/CategoryModel";
import { ShopCategoryModel, ShopModel } from "../data/models/ShopModel";
import { Category, Item } from "./Category";
import Pageable from "./Pageable";
import { Address, Shop, ShopCategory } from "./Shop";

export default interface IShopRepository {
  // Create a business category
  createShopCategory(title: string, display_image: string): Promise<string>;

  // Get a business category
  getShopCategory(id: string): Promise<ShopCategory>;

  // Get business categories list
  getShopCategories(): Promise<Array<ShopCategory>>;

  // Update a business category
  updateShopCategory(
    id: string,
    params: ShopCategoryModel
  ): Promise<ShopCategory>;

  // Delete a business category
  deleteShopCategory(id: string): Promise<ShopCategory>;

  //-----------------------------------------------------------------

  // Create a shop
  create(
    place_id: string,
    shop_category_id: string,
    name: string,
    number: string,
    contact: string,
    ratings: number,
    address?: Address
  ): Promise<string>;

  // Get one shop
  find(id: string): Promise<Shop>;

  // Update a shop
  update(id: string, data: ShopModel): Promise<Shop>;

  // Delete a shop
  delete(id: string): Promise<Shop>;

  // Find all shop for a place
  findByPlace(
    place_id: string,
    page: number,
    page_size: number
  ): Promise<Pageable<Shop>>;

  // Find shops for a specific category
  findByCategory(
    shop_category_id: string,
    place_id: string,
    page: number,
    page_size: number
  ): Promise<Pageable<Shop>>;

  //-------------------------------------------------------------------

  //Create a item's category
  createCategory(shop_id: string, title: string): Promise<string>;

  // Get categories list for a shop
  getCategories(shop_id: string): Promise<Array<Category>>;

  // Update a category
  updateCategory(id: string, data: CategoryModel): Promise<Category>;

  // Delete a category
  deleteCategory(id: string): Promise<Category>;

  //-------------------------------------------------------------------

  // Create a item
  createItem(
    shop_id: string,
    title: string,
    description: string,
    price: string,
    quantity: number,
    category_id?: string,
    offer_price?: number,
    offer_validity?: Date
  ): Promise<string>;

  // Get a item
  getItem(id: string): Promise<Item>;

  // Update a item
  updateItem(id: string, data: ItemModel): Promise<Item>;

  // Delete a item
  deleteItem(id: string): Promise<Item>;

  // Get all item
  getAllItem(
    shop_id: string,
    page: number,
    page_size: number
  ): Promise<Pageable<Item>>;

  // Get items by category
  getItemsByCategory(
    category_id: string,
    shop_id: string,
    page: number,
    page_size: number
  ): Promise<Pageable<Item>>;
}
