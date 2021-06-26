import IShopRepository from "../domain/IShopRepository";

export default class CreateShopCategoryUseCase {
  constructor(private repository: IShopRepository) {}

  public async execute(title: string, display_image: string): Promise<string> {
    const result = await this.repository.createShopCategory(
      title,
      display_image
    );
    return result;
  }
}
