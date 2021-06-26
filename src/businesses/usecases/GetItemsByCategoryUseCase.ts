import Pageable from "../domain/Pageable";
import { Item } from "../domain/Category";
import IShopRepository from "../domain/IShopRepository";

export default class GetItemsByCategoryUseCase {
  constructor(private repository: IShopRepository) {}

  public async execute(
    category_id: string,
    shop_id: string,
    page: number,
    page_size: number
  ): Promise<Pageable<Item>> {
    const result = await this.repository.getItemsByCategory(
      category_id,
      shop_id,
      page,
      page_size
    );

    return result;
  }
}
