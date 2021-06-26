import { Request, Response } from "express";
import { ShopCategory } from "../../domain/Shop";
import CreateShopCategoryUseCase from "../../usecases/CreateShopCategoryUseCase";
import DeleteShopCategoryUseCase from "../../usecases/DeleteShopCategoryUseCase";
import GetShopCategoriesUseCase from "../../usecases/GetShopCategoriesUseCase";
import GetShopCategoryUseCase from "../../usecases/GetShopCategoryUseCase";
import UpdateShopCategoryUseCase from "../../usecases/UpdateShopCategoryUseCase";

export default class ShopCategoryController {
  private readonly createUseCase;
  private readonly getUseCase;
  private readonly getAllUseCase;
  private readonly updateUseCase;
  private readonly deleteUseCase;
  constructor(
    createUseCase: CreateShopCategoryUseCase,
    getUseCase: GetShopCategoryUseCase,
    getAllUseCase: GetShopCategoriesUseCase,
    updateUseCase: UpdateShopCategoryUseCase,
    deleteUseCase: DeleteShopCategoryUseCase
  ) {
    (this.createUseCase = createUseCase),
      (this.getUseCase = getUseCase),
      (this.getAllUseCase = getAllUseCase),
      (this.updateUseCase = updateUseCase),
      (this.deleteUseCase = deleteUseCase);
  }

  public async createShopCategory(req: Request, res: Response) {
    const { title, display_image } = req.body;
    try {
      return this.createUseCase
        .execute(title, display_image)
        .then((value: string) =>
          res.status(200).json({ shop_category_id: value })
        )
        .catch((err: Error) => res.status(404).json({ err }));
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }

  public async getShopCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      return this.getUseCase
        .execute(id)
        .then((value: ShopCategory) => res.status(200).json({ category: value }))
        .catch((err: Error) => res.status(404).json({ err }));
    } catch (err) {
      return res.status(404).json({ error: err });
    }
  }

  public async getShopCategories(req: Request, res: Response) {
    try {
      return this.getAllUseCase
        .execute()
        .then((value: ShopCategory[]) =>
          res.status(200).json({ categories: value })
        )
        .catch((err: Error) => res.status(404).json({ err }));
    } catch (err) {
      return res.status(404).json({ error: err });
    }
  }

  public async updateShopCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;

      return this.updateUseCase
        .execute(id, data)
        .then((value: ShopCategory) =>
          res.status(200).json({ updated_object: value })
        )
        .catch((err: Error) => res.status(404).json({ err }));
    } catch (err) {}
  }

  public async deleteShopCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;

      return this.deleteUseCase
        .execute(id)
        .then((value: ShopCategory) =>
          res.status(200).json({ deleted_object: value })
        )
        .catch((err: Error) => res.status(404).json({ err }));
    } catch (err) {
      return res.status(404).json({ error: err });
    }
  }
}
