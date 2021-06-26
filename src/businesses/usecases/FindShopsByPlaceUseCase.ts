import Pageable from "../domain/Pageable";
import IShopRepository from "../domain/IShopRepository";
import { Shop } from "../domain/Shop";

export default class FindShopsByPlaceUseCase {
  constructor(private repository: IShopRepository) {}

  public async execute(
    place_id: string,
    page: number,
    page_size: number
  ): Promise<Pageable<Shop>> {
    const result = await this.repository.findByPlace(place_id, page, page_size);

    return result;
  }
}
