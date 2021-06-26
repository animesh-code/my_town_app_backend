import Pageable from "../domain/Pageable";
import IShopRepository from "../domain/IShopRepository";
import { Shop } from "../domain/Shop";

export default class FindShopsByCategoryUseCase {
  constructor(private repository: IShopRepository) {}

  public async execute(
    shop_category_id: string,
    place_id: string,
    page: number,
    page_size: number
  ): Promise<Pageable<Shop>> {
    const result = await this.repository.findByCategory(
      shop_category_id,
      place_id,
      page,
      page_size
    );

    return result;
  }
}
