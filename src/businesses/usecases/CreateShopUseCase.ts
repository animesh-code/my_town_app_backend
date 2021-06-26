import IShopRepository from "../domain/IShopRepository";
import { Address, Shop } from "../domain/Shop";

export default class CreateShopUseCase {
  constructor(private repository: IShopRepository) {}

  public async execute(
    place_id: string,
    shop_category_id: string,
    name: string,
    number: string,
    contact: string,
    ratings: number,
    address: Address
  ): Promise<string> {
    const result = await this.repository.create(
      place_id,
      shop_category_id,
      name,
      number,
      contact,
      ratings,
      address
    );

    return result;
  }
}
