import IShopRepository from "../domain/IShopRepository";
import { ShopCategory } from "../domain/Shop";

export default class GetShopCategoryUseCase {
  constructor(private repository: IShopRepository) {}

  public async execute(id: string): Promise<ShopCategory> {
    const result = await this.repository.getShopCategory(id);

    return result;
  }
}
