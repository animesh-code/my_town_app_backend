import { Item } from "../domain/Category";
import IShopRepository from "../domain/IShopRepository";

export default class GetItemUseCase {
  constructor(private repository: IShopRepository) {}

  public async execute(id: string): Promise<Item> {
    const result = await this.repository.getItem(id);

    return result;
  }
}
