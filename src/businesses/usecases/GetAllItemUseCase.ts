import { Item } from "../domain/Category";
import IShopRepository from "../domain/IShopRepository";
import Pageable from "../domain/Pageable";

export default class GetAllItemUseCase {
  constructor(private repository: IShopRepository) {}

  public async execute(
    shop_id: string,
    page: number,
    page_size: number
  ): Promise<Pageable<Item>> {
    const result = await this.repository.getAllItem(shop_id, page, page_size);

    return result;
  }
}
