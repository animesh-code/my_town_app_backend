import { Item } from "../domain/Category";
import IShopRepository from "../domain/IShopRepository";

export default class DeleteItemUseCase {
  constructor(private repository: IShopRepository) {}

  public async execute(id: string): Promise<Item> {
    const result = await this.repository.deleteItem(id);

    return result;
  }
}
