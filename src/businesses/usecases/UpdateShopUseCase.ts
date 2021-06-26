import { ShopModel } from "../data/models/ShopModel";
import IShopRepository from "../domain/IShopRepository";
import { Shop } from "../domain/Shop";

export default class UpdateShopUseCase {
  constructor(private repository: IShopRepository) {}

  public async execute(id: string, data: ShopModel): Promise<Shop> {
    const result = await this.repository.update(id, data);

    return result;
  }
}
