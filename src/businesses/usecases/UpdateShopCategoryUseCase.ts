import { ShopCategoryModel } from "../data/models/ShopModel";
import IShopRepository from "../domain/IShopRepository";
import { ShopCategory } from "../domain/Shop";

export default class UpdateShopCategoryUseCase {
  constructor(private repository: IShopRepository) {}

  public async execute(
    id: string,
    params: ShopCategoryModel
  ): Promise<ShopCategory> {
    const result = await this.repository.updateShopCategory(id, params);

    return result;
  }
}
