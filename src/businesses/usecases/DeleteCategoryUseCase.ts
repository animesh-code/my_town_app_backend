import { Category, Item } from "../domain/Category";
import IShopRepository from "../domain/IShopRepository";

export default class DeleteCategoryUseCase {
  constructor(private repository: IShopRepository) {}

  public async execute(id: string): Promise<Category> {
    const result = await this.repository.deleteCategory(id);

    return result;
  }
}
