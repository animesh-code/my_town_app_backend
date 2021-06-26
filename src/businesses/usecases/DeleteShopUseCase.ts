import IShopRepository from "../domain/IShopRepository";
import { Shop } from "../domain/Shop";

export default class DeleteShopUseCase {
  constructor(private repository: IShopRepository) {}

  public async execute(id: string): Promise<Shop> {
    const result = this.repository.delete(id);

    return result;
  }
}
