import { ItemModel } from "../data/models/CategoryModel";
import { Item } from "../domain/Category";
import IShopRepository from "../domain/IShopRepository";

export default class UpdateItemUseCase {
  constructor(private repository: IShopRepository) {}

  public async execute(id: string, data: ItemModel): Promise<Item> {
    const result = await this.repository.updateItem(id, data);

    return result;
  }
}
