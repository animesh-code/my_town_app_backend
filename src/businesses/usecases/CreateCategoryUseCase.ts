import IShopRepository from "../domain/IShopRepository";

export default class CreateCategoryUseCase {
  constructor(private repository: IShopRepository) {}

  public async execute(shop_id: string, title: string): Promise<string> {
    const result = await this.repository.createCategory(shop_id, title);

    return result;
  }
}
