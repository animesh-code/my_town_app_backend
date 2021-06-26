import { Category, Item } from "../domain/Category";
import IShopRepository from "../domain/IShopRepository";

export default class GetCategoriesUseCase {
  constructor(private repository: IShopRepository) {}

  public async execute(shop_id: string): Promise<Array<Category>> {
    const result = await this.repository.getCategories(shop_id);

    return result;
  }
}
