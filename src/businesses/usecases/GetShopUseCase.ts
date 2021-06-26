import IShopRepository from "../domain/IShopRepository";
import { Shop } from "../domain/Shop";

export default class GetShopUseCase {
  constructor(private repository: IShopRepository) {}

  public async execute(id: string): Promise<Shop> {
    const result = await this.repository.find(id);

    return result;
  }
}
