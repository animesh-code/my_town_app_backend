import IShopRepository from "../domain/IShopRepository";
import { ShopCategory } from "../domain/Shop";

export default class GetShopCategoriesUseCase {
  constructor(private repository: IShopRepository) {}

  public async execute(): Promise<Array<ShopCategory>> {
    const result = await this.repository.getShopCategories();

    return result;
  }
}
