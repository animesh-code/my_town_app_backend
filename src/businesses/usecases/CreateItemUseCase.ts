import { Item } from "../domain/Category";
import IShopRepository from "../domain/IShopRepository";

export default class CreateItemUseCase {
  constructor(private repository: IShopRepository) {}

  public async execute(
    shop_id: string,
    title: string,
    description: string,
    price: string,
    quantity: number,
    category_id: string,
    offer_price?: number,
    offer_validity?: Date
  ): Promise<string> {
    const result = await this.repository.createItem(
      shop_id,
      title,
      description,
      price,
      quantity,
      category_id,
      offer_price,
      offer_validity
    );

    return result;
  }
}
