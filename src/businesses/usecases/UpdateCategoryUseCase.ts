import { CategoryModel } from "../data/models/CategoryModel";
import { Category, Item } from "../domain/Category";
import IShopRepository from "../domain/IShopRepository";

export default class UpdateCategoryUseCase {
  constructor(private repository: IShopRepository) {}

  public async execute(id: string, data: CategoryModel): Promise<Category> {
    const result = await this.repository.updateCategory(id, data);

    return result;
  }
}
