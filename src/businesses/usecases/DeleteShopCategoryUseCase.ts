import IShopRepository from "../domain/IShopRepository";
import { ShopCategory } from "../domain/Shop";

export default class DeleteShopCategoryUseCase {
  constructor(private repository: IShopRepository) {}

  public async execute(id: string): Promise<ShopCategory> {
    const result = await this.repository.deleteShopCategory(id);

    return result;
  }
}
